import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
  
  constructor( private storage:Storage){

  }
  addPhoto(photo: any) {

    console.log('Upload');
    const imageRef = ref(this.storage, `images/${photo.name}`);
    const upload = uploadBytesResumable(imageRef, photo)
    upload.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)
      console.log(progress)
    },
    (error)=>{
      console.log(error.message)
    },
    ()=>{
      getDownloadURL(upload.snapshot.ref).then((downloadUrl)=>{
        console.log(downloadUrl)
      })
    }
  )
  }
}
