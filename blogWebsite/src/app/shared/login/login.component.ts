import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

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
  activeClass = 'login';
  loginActive = true;
  loginFormGroup = new FormGroup({
    UserName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
  });

  registerFormGroup = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
  });
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ,
   public auth: AuthService) {}

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openRegistration() {
    this.activeClass = 'registration';
    this.loginActive = false;
  }
  openLogin() {
    this.loginActive = true;
  }
}
