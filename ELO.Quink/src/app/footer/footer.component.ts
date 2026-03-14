import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment';
import { SettingsService } from '../_shared/settings.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        ButtonModule
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    public env: any = environment;

    constructor(
        public settings: SettingsService
    ) { }
}
