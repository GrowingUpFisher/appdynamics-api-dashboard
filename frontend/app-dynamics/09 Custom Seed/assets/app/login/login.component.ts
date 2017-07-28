import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CachedDataService } from '../services/cached-data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private cachedDataService: CachedDataService) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'account': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)

    });
  }

  onSubmit() {

    const account = this.loginForm.get('account').value;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.router.navigate(['/dashboard']);

    // this.loginService
    //   .authenticateExistingUser(account, username, password)
    //   .subscribe(response => {
    //     this.cachedDataService.setUserAccountDetails(response.json().body);
    //     localStorage.setItem('authHeader', 'Basic ' + btoa(username + "@" + account + ":" + password));
    //     this.router.navigate(['/dashboard']);
    //   }, (error) => console.log("error : " + error));
  }

}
