import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup; //this property hold our form (FormGroup makes up the form)

  ngOnInit() { //I'll initializa my form here:
    this.signupForm = new FormGroup({
      // controls are key-value pairs
      'username': new FormControl(null, Validators.required),// how you should required instead of passing it in template
      'email' : new FormControl(null, [Validators.required, Validators.email]), //pass with [] for more validates
      'gender' : new FormControl('female')
    });
  }

  onSubmit() { //now we have access to our form, we create it by ourselves
    console.log("Submitted!", this.signupForm);
  }

}
