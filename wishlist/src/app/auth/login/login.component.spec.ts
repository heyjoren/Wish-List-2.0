import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BackendAdminService } from '../admin/backend-admin.service';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const mockAuth = {}; // Mock object voor Auth
    const mockFirestore = {}; // Mock object voor Firestore

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, CommonModule],
      providers: [
        FormBuilder,
        AuthService,
        { provide: Router, useValue: {} }, // simuleren
        BackendAdminService,
        { provide: Auth, useValue: mockAuth }, // simuleren
        { provide: Firestore, useValue: mockFirestore } // simuleren
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email should not be empty', () => {
    let emailerr;
    const email = component.form.get('credentials.email');

    email?.setValue('');
    expect(email?.status).toEqual("INVALID");
    expect(email?.hasError('required')).toBeTrue();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      emailerr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(emailerr.textContent).toContain('Wachtwoord of email onjuist');
    })
  });

  it('email should be type of email', () => {
    let emailerr;
    const email = component.form.get('credentials.email');

    email?.setValue('test');
    expect(email?.status).toEqual("INVALID");
    expect(email?.hasError('email')).toBeTrue();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      emailerr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(emailerr.textContent).toContain('Wachtwoord of email onjuist');
    })
  });

  it('email is correct', () => {
    let emailerr;
    const email = component.form.get('credentials.email');

    email?.setValue('test@test.com');
    expect(email?.status).toEqual("VALID");
    expect(email?.hasError('required')).toBeFalse();
    expect(email?.hasError('email')).toBeFalse();


    fixture.detectChanges();

    fixture.whenStable().then(() => {
      emailerr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(emailerr).toBeNull;
    })
  });

  it('passwd is invalid', () => {
    let passwderr;
    const passwd = component.form.get('credentials.passwd');

    passwd?.setValue('12345678');
    expect(passwd?.status).toEqual("INVALID");
    expect(passwd?.hasError('passwordStrength')).toBeTrue();
    expect(passwd?.hasError('required')).toBeFalse();
    expect(passwd?.hasError('minLength')).toBeFalse();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      passwderr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(passwderr.textContent).toContain('Wachtwoord of email onjuist');
    })
  });


  it('passwd is valid: Test123*', () => {
    let passwderr;
    const passwd = component.form.get('credentials.passwd');

    passwd?.setValue('Test123*');
    expect(passwd?.status).toEqual("VALID");
    expect(passwd?.hasError('passwordStrength')).toBeFalse();
    expect(passwd?.hasError('required')).toBeFalse();
    expect(passwd?.hasError('minLength')).toBeFalse();


    fixture.detectChanges();

    fixture.whenStable().then(() => {
      passwderr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(passwderr).toBeNull;
    })
  });

  it('passwd is valid: TESTtest12345*&_', () => {
    let passwderr;
    const passwd = component.form.get('credentials.passwd');

    passwd?.setValue('TESTtest12345*&_');
    expect(passwd?.status).toEqual("VALID");
    expect(passwd?.hasError('passwordStrength')).toBeFalse();
    expect(passwd?.hasError('required')).toBeFalse();
    expect(passwd?.hasError('minLength')).toBeFalse();


    fixture.detectChanges();

    fixture.whenStable().then(() => {
      passwderr = fixture.debugElement.query(By.css('.credentials span')).nativeElement;
      expect(passwderr).toBeNull;
    })
  });
});
