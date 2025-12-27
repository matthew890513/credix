import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goBack() {
    // Obtenemos la ruta padre (la ruta principal donde está el not found)
    const parentUrl = this.router.url.split('/').slice(0, -1).join('/') || '/';
    this.router.navigate([parentUrl]);
  }
}
