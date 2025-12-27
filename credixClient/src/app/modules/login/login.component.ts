import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/repositories/authentication.service';
import { LoaderService } from '../../core/services/loader.service';
import { SessionService } from '../../core/services/session.service';
import { AlertService } from '../../core/services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  title = environment.title;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit(): void {
    this.loaderService.setLoadingState(true);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (data) => {
          if (data.token != undefined || data.token != '') {
            this.sessionService.setLoggedUserCreateSession(data);
            this.loaderService.setLoadingState(false);
            this.router.navigate(['/app']);
          }
        },
        error: (err) => {
          console.error('Error login:', err);
          this.loaderService.setLoadingState(false);
          this.alertService.showToast('error', 'Error', 'Invalid credentials');
        },
      });
    }
  }

}