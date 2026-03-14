import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SettingsService } from '../_shared/settings.service';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatSlideToggleModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    public settings = inject(SettingsService);
    open = false;

    toggle() { this.open = !this.open; }
    close() { this.open = false; }
}
