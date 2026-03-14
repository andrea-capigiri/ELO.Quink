import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from '../settings/settings.component';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        SettingsComponent
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    public env: any = environment;
    public year: number = new Date().getFullYear();
}
