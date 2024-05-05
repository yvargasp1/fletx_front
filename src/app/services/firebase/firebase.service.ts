import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../../models/Product.dto';
import { environment } from '../../../environments/environment';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private storage: Storage) {}
  public async saveImage(file: any): Promise<string> {
    const imageRef = ref(this.storage, `images/${file.name}`);
    const upload = uploadBytesResumable(imageRef, file);

    return new Promise<string>((resolve, reject) => {
      upload.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          console.log(progress);
        },
        (error) => {
          console.log(error.message);
          reject(error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(upload.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  }
}
