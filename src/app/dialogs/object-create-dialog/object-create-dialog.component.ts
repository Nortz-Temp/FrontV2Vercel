import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obj, ObjectCreateDto } from 'src/app/models/object';
import { ObjectInfo } from 'src/app/models/objectInfo';
import { User } from 'src/app/models/user.model';
import { ObjectInfoService } from 'src/app/Services/object-info.service';
import { ObjectService } from 'src/app/Services/object.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-object-create-dialog',
  templateUrl: './object-create-dialog.component.html',
  styleUrls: ['./object-create-dialog.component.css']
})
export class ObjectCreateDialogComponent implements OnInit {

  public flag: number;

  public users: User[] = [];


  objectInfo:ObjectInfo;
  object:Obj;

  constructor(public snackBar:MatSnackBar, public dialogRef:MatDialogRef<ObjectCreateDialogComponent>, @Inject (MAT_DIALOG_DATA) public data: ObjectCreateDto, public objectService: ObjectService, public userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

public add(): void{

  this.objectService.createObject(this.data)
  .subscribe( data =>{
    this.snackBar.open('Object successfully added: ' + this.data.objectName, 'Ok', { duration: 2500 });
  } ),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
  }
}

/*
public update(): void{
  this.objectService.updateObject(this.data)
  .subscribe(data => {
    this.snackBar.open('Updated object: ' + this.data.objectName, 'OK', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occured, try again later. ', 'Close', { duration: 2500 });
  }
}*/

public delete(): void{
 /* this.objectService.deleteObject(this.data)
  .subscribe(data => {
    this.snackBar.open('Object successfully deleted', 'Ok', { duration: 2500 });
  }),
  (error:Error) => {
    console.log(error.name + ' -> ' + error.message)
    this.snackBar.open('An error occurred. ', 'Close', { duration: 2500 });
  }*/
}

public close(): void{
this.dialogRef.close();
}

}

