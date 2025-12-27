import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  showToast(severity: 'success' | 'error' | 'info' | 'warn', summary: string, detail: string): void {
    const panelClass = {
      success: 'snack-success',
      error: 'snack-error',
      info: 'snack-info',
      warn: 'snack-warn'
    }[severity];

    this.snackBar.open(`${summary}: ${detail}`, 'Cerrar', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: panelClass ? [panelClass] : undefined
    });
  }
}