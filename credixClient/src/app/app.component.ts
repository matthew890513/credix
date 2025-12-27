import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './core/services/loader.service';
import { ChangeDetectorRef } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading = false;

  constructor(
    private cd: ChangeDetectorRef,
    private sessionService: SessionService,
    private loaderService: LoaderService,
    private titleService: Title
  ) {
    this.titleService.setTitle(environment.title);
  }

  ngOnInit(): void {
    this.sessionService.initializeSession();

    this.loaderService.loading$.subscribe((state) => {
      this.loading = state;
      this.cd.detectChanges();
    });
  }
}
