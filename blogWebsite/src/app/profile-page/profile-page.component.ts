import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePAgeComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }


}
