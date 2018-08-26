import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import {MatDialog} from '@angular/material';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private route: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  gotoProfile() {
    this.route.navigateByUrl('/profile');
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '350px',
      data: {name: 'this.name', animal: 'this.animal'}
    });
  }
}
