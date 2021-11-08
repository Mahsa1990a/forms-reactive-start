import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup; //this property hold our form

  ngOnInit() { //I'll initializa my form here:
    this.signupForm = new FormGroup({
      // controls are key-value pairs
      'username': new FormControl(null),
      'email' : new FormControl(null),
      'gender' : new FormControl('female')
    });
  }

}
