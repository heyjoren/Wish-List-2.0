import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from './user/user.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;

  constructor( private router: Router, private auth: Auth, private db: Firestore) { 
    if(localStorage.getItem('token'))
    {
      this.token = localStorage.getItem('token');
    }
  }

  //synchrone validator
  passwdValidation(control: AbstractControl): ValidationErrors | null { 
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[\W\_]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !valid ? {passwordStrength: true} : null;
  } 

  // asynchrone validator
  async emailExists(control: AbstractControl): Promise<ValidationErrors | null> {
    // const email = control.value;
    
    // try {
    //     const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
    //     console.log(signInMethods.length > 0 ? { emailExists: true } : null);
    //     return signInMethods.length > 0 ? { emailExists: true } : null;
    // } catch (error) {
    //     console.error('Error bij het checken of e-mail al bestaat:', error);
    //     return null;
    // }

    const auth = getAuth();
    const email = "async@async.com";
    console.log("Checking email:", email);

    fetchSignInMethodsForEmail(auth, email)
      .then((methods) => {
        console.log("Sign-in methods for email:", methods);
      })
      .catch((error) => {
        console.error("Error fetching sign-in methods:", error);
      });

    return null;
}


  async signUp(user: user): Promise<string>{
    try {
    await createUserWithEmailAndPassword(this.auth, user.email, user.passwd);
    const userId = this.auth.currentUser!.uid;

    await this.signupUserData(userId, user);

    return 'success';
  } catch (error) {
    console.log(error);
    return 'could not create a user: ' + (error as Error).message;
  }
  }

  async signupUserData(userId : string, user : user): Promise<string>{
    
    const userRef = doc(this.db, 'user', userId);
    try {
      const { email, passwd, ...userWithoutEmailAndPasswd } = user; //om email en passwd niet in de db te laten opslaan.
      await setDoc(userRef, {...userWithoutEmailAndPasswd, role: 1}); //de ... is om alle velden van user toe te voegen.
      return 'success';
    } catch (error) {
      console.log(error);
      throw new Error('Error saving user data: ' + error);
    }
  }

  login(user: user){
    return signInWithEmailAndPassword(this.auth, user.email, user.passwd)
    .then( () => {
      return this.auth.currentUser?.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          localStorage.setItem('token', token);
          return true
        }
      );
    })
    .catch( 
      error => {
        console.log(error);
        return false;
      }
    );
  }

  isLoggedIn():boolean {
    return this.token != null;
  }

  logOut(): void {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }
}
