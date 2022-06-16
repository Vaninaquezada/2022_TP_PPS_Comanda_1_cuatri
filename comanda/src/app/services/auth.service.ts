import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { User } from '../clases/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>
  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }

  async SignIn(email: string, password: string){
    try {
      const { user } = await this.firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
    }
    // await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res=>{
    //   this.isLoggedIn = true;
    //   localStorage.setItem('user', JSON.stringify(res.user))
    // })
  }

  async SignUp(email: string, password: string){
    
    try {
      const { user } = await this.firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // await this.sendVerificationEmail();
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user))
      return user;
    } catch (error) {
      console.log(error);
    }
    
  }

  LogOut(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('usuario');
  }

  async sendVerificationEmail(): Promise<void> {
    console.log("entro a envio de email " + (await this.firebaseAuth.currentUser).email);
    return (await this.firebaseAuth.currentUser).sendEmailVerification();
  }

  
  getAuth()
  {
    return this.firebaseAuth.currentUser;
  }
}
