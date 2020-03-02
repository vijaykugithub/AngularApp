import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService,// {4}
     private router:Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (res:any)=>{
          localStorage.setItem('token',res.token);
          console.log(res.token);
          this.router.navigateByUrl('/dashboard');
        },
        err=>{
            console.log("error got for login page.")
          
        }
      ); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }
}