import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup; //this property hold our form (FormGroup makes up the form)
  forbiddenUsernames = ['Chris', 'Anna'];//for creating my own validator


  ngOnInit() { //I'll initializa my form here:
    this.signupForm = new FormGroup({
      // controls are key-value pairs
      'userData': new FormGroup({ //to group
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),// how you should required instead of passing it in template
        //                               pass with [] for more validates
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      // 'username': new FormControl(null, Validators.required),// how you should required instead of passing it in template
      // 'email' : new FormControl(null, [Validators.required, Validators.email]), //pass with [] for more validates
      'gender' : new FormControl('female'),
      // FormArray: holds an arr of controls
      'hobbies': new FormArray([])
    });

    // Reacting to Status or Value Changes:
    // this.signupForm.valueChanges.subscribe( // valueChanges is hook observable so we can suscribe to it
    //   (value) => console.log("VALUE:", value)
    // )
    this.signupForm.statusChanges.subscribe(
      (status) => console.log("STATUS:", status)
    )

    // Setting and Patching Values:
      // this.signupForm.setValue({ //update whole
      //   'userData': {
      //     'username': 'Mahsa',
      //     'email': 'ameri@test.com'
      //   },
      //   'gender': 'female',
      //   'hobbies': []
      // });
      this.signupForm.patchValue({ //update specific part
        'userData': {
          'email': 'ameri@test.com'
        }
      });
  }

  onSubmit() { //now we have access to our form, we create it by ourselves
    console.log("Submitted!", this.signupForm);
    // this.signupForm.reset(); //to reset the form  OR:
    this.signupForm.reset({ //reset specific parts
      'userData': {
        'username': '',
        'email': ''
      },
      'gender': 'female',
      'hobbies': []
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // everything between () is FormArray
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  //for creating my own validator:
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  // Create async validators:
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  } //after creation, we should add it to line22
}
