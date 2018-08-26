import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRegisterFormGroup = new FormGroup({
    UserName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
