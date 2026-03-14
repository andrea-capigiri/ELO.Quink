import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import manifest from '../../manifest.json';
import { SettingsService } from '../_shared/settings.service';

type Language = 'en' | 'it';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        FloatLabel,
        FormsModule,
        TranslateModule,
        Card,
        ButtonModule,
        ToggleSwitch,
        SelectModule
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent {
    public router = inject(Router);
    public settings = inject(SettingsService);
    private translate = inject(TranslateService);

    manifest = manifest;
    year = new Date().getFullYear();

    languages: { value: Language; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'it', label: 'Italiano' },
    ];

    currentLanguage: Language = (localStorage.getItem('elo-quink-language') ?? 'it') as Language;

    onLanguageChange(lang: Language): void {
        this.translate.use(lang);
        this.currentLanguage = lang;
        localStorage.setItem('elo-quink-language', lang);
    }

    openGithub(): void {
        const url = 'https://github.com/andrea-capigiri/ELO.Quink';
        if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    }

    openDonate(): void {
        const url = 'https://www.buymeacoffee.com/andrea.capigiri';
        if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
            chrome.tabs.create({ url });
        } else {
            window.open(url, '_blank');
        }
    }
}
