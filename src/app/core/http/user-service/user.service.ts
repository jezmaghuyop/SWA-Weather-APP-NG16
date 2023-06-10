import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);

  constructor() {}

  getUserDetails(): Observable<string> {
    return this.http.get<string>(`${environment.api.user}/api/user-info`);
  }
}
