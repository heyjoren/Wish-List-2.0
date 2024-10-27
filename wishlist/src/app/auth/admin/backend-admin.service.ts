import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable, Subject } from 'rxjs';
import { user } from '../user/user.module';
import { admin } from './admin/admin.module';

@Injectable({
  providedIn: 'root'
})
export class BackendAdminService {

  users: user[] = [];
  admins: admin[] = [];

  IsAdmin = new Subject<boolean>();

  constructor(private db: Firestore) { }

  getAllUsers(): Observable<user[]>
  {
    return collectionData<user>(
      collection(this.db, 'user') as CollectionReference<user>,
      { idField: 'id'}
    )
  }

  getAllUsersPut(): void {
    this.getAllUsers().subscribe({
      next: (respons: user[]) => {
        this.users = respons;
      },
      error: (error) => console.log('error: ', error)
    });
  }

  getAllAdmins(): Observable <admin[]>
  {
    return collectionData<admin>(
      collection(this.db, 'admin') as CollectionReference<admin>,
      { idField: 'id'}
    )
  }

  getAllAdminsPutAssignRoles(): void {
    this.getAllAdmins().subscribe({
      next: (respons: admin[]) => {
        this.admins = respons;
        this.assignRoles();

      },
      error: (error) => console.log('error: ', error)
    });
  }

  assignRoles()
  {
    this.users.forEach(user => {

      for(const admin of this.admins)
      {
        if (user.id == admin.id)
        {
          user.role = "Admin";
          break;
        }
        else{
          user.role = "User";
        }
      }
    });
  }

  addAdmin(user: user)
  {
    const adminRef = doc(this.db, '/admin', user.id!)
    return from(setDoc(adminRef, {email: user.email} ))
  }

  deleteAdmin(admin: admin)
  {
    const adminRef = doc(this.db, '/admin', admin.id)
    return from(deleteDoc(adminRef));
  }

  getAdmin(uid: string | null)
  {
    return docData<admin>(
      doc(this.db, '/admin/' + uid) as DocumentReference<admin>
    )
  }

  checkAdmin(bool: boolean)
  {
    this.IsAdmin.next(bool);
    if(bool == true)
    {
      // JSON.stringify(true) is om een object om te zetten naar een string
      localStorage.setItem('isAdmin', JSON.stringify(true) );
    }
    else
    {
      localStorage.removeItem('isAdmin');
      
    }
  }

  getStoredAdminStatus(): boolean
  {
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if(storedAdminStatus === 'true')
    {
    return true;
    }
    else
    {
      return false;
    }
  }
  
}
