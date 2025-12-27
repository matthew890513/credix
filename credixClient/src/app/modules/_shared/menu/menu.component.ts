import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SessionData,
  SessionService,
} from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MenuItem } from './menuitem.model';
import { filterMenuByPermissions } from './menuitem.utils';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Printer } from 'src/app/core/models/admin-response.model';
import { CommonService } from 'src/app/core/repositories/common.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { env } from 'node:process';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ChatGTPComponent } from 'src/app/modules/_shared/chat-gtp/chat-gtp.component';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    TranslateModule,
    MatDialogModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  title = environment.title;
  session: SessionData = { uname: '', plant: 0, printer: '', lang: '' };
  appVersion = environment.appVersion;
  plants = environment.plants;
  printers: Printer[] = [];
  languages = environment.languages;
  menuItems: MenuItem[] = environment.menu;
  selectedLang = 'es';
    chatDialogRef: any;
  isMinimized = false;

  constructor(
    private sessionService: SessionService,
    private commonService: CommonService,
    private router: Router,
    private loaderService: LoaderService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.session = this.sessionService.loggedUser ?? this.session;
    const userPermissions = this.sessionService.getPermissions(); // tu lógica
    this.menuItems = filterMenuByPermissions(this.menuItems, userPermissions);
    this.printers = this.sessionService.getPrinters();
    this.translate.use(this.session.lang ?? 'es');
  }

  updatePlant(event: Event) {
    this.loaderService.setLoadingState(true);
    const value = Number((event.target as HTMLSelectElement).value);
    if (!this.session) return;
    this.session.plant = value;
    const lang = this.session.lang ?? 'E';
    this.commonService.getPrinters(this.session.plant, lang).subscribe(
      (printers: Printer[]) => {
        const defaultPrinter =
          printers && printers.length
            ? printers[0].printer
            : this.session.printer || '';

        const updatedSession: SessionData = {
          ...this.session,
          printers: printers,
          printer: defaultPrinter,
        };
        this.sessionService.setLoggedUserCreateSession(updatedSession);
        this.session = updatedSession;
        this.loaderService.setLoadingState(false);
        window.location.reload();
      },
      (error) => {
        this.loaderService.setLoadingState(false);
        console.error('Error obteniendo impresoras:', error);
        this.sessionService.setLoggedUserCreateSession(this.session);
        window.location.reload();
      }
    );
  }

  updatePrinter(event: Event) {
    this.loaderService.setLoadingState(true);
    const value = (event.target as HTMLSelectElement).value;
    if (this.session) {
      this.session.printer = value;
      this.sessionService.setLoggedUserCreateSession(this.session);
      window.location.reload();
      this.loaderService.setLoadingState(false);
    }
  }

  updateLang(event: Event) {
    this.loaderService.setLoadingState(true);

    const value = (event.target as HTMLSelectElement).value;
    if (value === 'E') {
      this.translate.use('en');
    } else {
      this.translate.use('es');
    }
    if (this.session) {
      this.session.lang = value;
      this.sessionService.setLoggedUserCreateSession(this.session);
      this.loaderService.setLoadingState(false);
    }
  }

  help() {
    this.dialog.open(ChatGTPComponent, {
      width: '300px',
      height: '400px',
      position: { bottom: '20px', right: '20px' }, // 📍 Abajo derecha
      panelClass: 'chat-dialog-container',
      backdropClass: 'no-backdrop', // 👈 sin fondo opaco
    });
  }

  logout() {
    this.sessionService.setLoggedState(false);
    this.router.navigate(['/login']);
  }
}
