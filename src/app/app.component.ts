import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      'userData': new FormGroup({ //to group
        'username': new FormControl(null, Validators.required),// how you should required instead of passing it in template
        'email' : new FormControl(null, [Validators.required, Validators.email]), //pass with [] for more validates
      }),
      // 'username': new FormControl(null, Validators.required),// how you should required instead of passing it in template
      // 'email' : new FormControl(null, [Validators.required, Validators.email]), //pass with [] for more validates
      'gender' : new FormControl('female'),
      // FormArray: holds an arr of controls
      'hobbies': new FormArray([])
    });
  }

  onSubmit() { //now we have access to our form, we create it by ourselves
    console.log("Submitted!", this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // everything between () is FormArray
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}
