import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from './user/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router, private auth: Auth, private db: Firestore) { }

  passwdValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[\W\_]/.test(value);
    const test = /[\W]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !valid ? {passwordStrength: true} : null;
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
}
