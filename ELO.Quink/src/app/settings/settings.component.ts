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
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { SettingsService } from '../_shared/settings.service';

type Language = 'en' | 'it' | 'zh' | 'hi' | 'es' | 'ar';

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
    private appService = inject(ApplicationService);
    private translate = inject(TranslateService);

    manifest = manifest;
    year = new Date().getFullYear();
    private favoriteEditorPath = environment.favoriteEditorPath;

    languages: { value: Language; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'zh', label: '中文' },
        { value: 'hi', label: 'हिन्दी' },
        { value: 'es', label: 'Español' },
        { value: 'ar', label: 'العربية' },
        { value: 'it', label: 'Italiano' },
    ];

    currentLanguage: Language = (localStorage.getItem('elo-quink-language') ?? 'en') as Language;

    private static readonly RTL_LANGUAGES = new Set(['ar']);

    onLanguageChange(lang: Language): void {
        this.translate.use(lang);
        this.currentLanguage = lang;
        localStorage.setItem('elo-quink-language', lang);
        document.documentElement.dir = SettingsComponent.RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr';
    }

    openQuickLinksEditor(): void {
        const id = this.appService.otherBookmarksId;
        const url = id ? `${this.favoriteEditorPath}?id=${id}` : this.favoriteEditorPath;
        this.appService.openUrl(url);
    }

    openBookmarksEditor(): void {
        const id = this.appService.bookmarksBarId;
        const url = id ? `${this.favoriteEditorPath}?id=${id}` : this.favoriteEditorPath;
        this.appService.openUrl(url);
    }

    openGithub(): void {
        this.appService.openUrl('https://github.com/andrea-capigiri/ELO.Quink');
    }

    openDonate(): void {
        this.appService.openUrl('https://www.buymeacoffee.com/andrea.capigiri');
    }
}
