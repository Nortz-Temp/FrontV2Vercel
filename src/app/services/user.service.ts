
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly adress ="http://localhost:8083/user";
  private readonly userAdress ="http://localhost:8086/api";



  public getUsers(): Observable<User[]>{

    let retval$ = new Subject<User[]>();

    this.http.get<User[]>(`${this.userAdress}/users`).subscribe((users: User[]) => {

      retval$.next(users)

    });

    return retval$.asObservable();
  }



  /*
  public createUser(user:User):Observable<User>{

    let retval$ = new Subject<User>();

    this.http.post<User>(`${this.userAdress}/feedbacks`, user).subscribe((helper: User) => {

      retval$.next(helper)

    });

    return retval$.asObservable();
  }
*/

  public editUser(user:User):Observable<User>{

    let retval$ = new Subject<User>();

    this.http.put<User>(`${this.userAdress}/users`,user).subscribe((helper: User) => {

      retval$.next(helper)

    });

    return retval$.asObservable();


  }

  public getOneUser(user:User):Observable<User>{

    let retval$ = new Subject<User>();

      this.http.get<User>(`${this.userAdress}/users/username/${user.username}`).subscribe((helper: User) => {
        retval$.next(helper)

    });

    return retval$.asObservable();

  }

  public getUserByUsername(username:String): Observable<User>{

    let retval$ = new Subject<User>();

    this.http.get<User>(`${this.userAdress}/users/username/${username}`).subscribe((user: User) => {

      retval$.next(user)

    });

    return retval$.asObservable();
  }






}