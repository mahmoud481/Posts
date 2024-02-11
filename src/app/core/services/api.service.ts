import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonService } from './common.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users$ = new Observable();
  posts$:any = new Observable();
  currentUser: any = '';

  private usersUrl = `${environment.baseURL}/users`;
  private postsUrl = `${environment.baseURL}/posts`;
  private commentsUrl = `${environment.baseURL}/comments`;

  constructor(private http: HttpClient, private common: CommonService) { }

  getUsers(): Observable<any[]> {
      return this.http.get<any[]>(this.usersUrl).pipe(
        tap(users =>users),
        catchError(this.handleError<any[]>('getUsers', []))
      );
  }


  getPosts(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.postsUrl}?userId=${userId}`).pipe(
        tap(posts => posts),
        catchError(this.handleError<any[]>('getPosts', []))
      );
  }

  getComments(postId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.commentsUrl}?postId=${postId}`).pipe(
        tap(comments => comments),
        catchError(this.handleError<any[]>('getComments', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
