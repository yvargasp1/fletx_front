import { Injectable } from '@angular/core';
import { environtment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private URL = environtment.api;
  constructor() {}
}
