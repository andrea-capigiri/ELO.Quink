import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AppComponent } from './app/app.component';
import { ApplicationService } from './app/_shared/application.service';

const LANGUAGE_KEY = 'elo-quink-language';

const SUPPORTED_LANGUAGES = ['en', 'it', 'zh', 'hi', 'es', 'ar'] as const;
const RTL_LANGUAGES = new Set(['ar']);

function getSavedLanguage(): string {
    try {
        const stored = localStorage.getItem(LANGUAGE_KEY);
        return SUPPORTED_LANGUAGES.includes(stored as any) ? stored! : 'en';
    } catch {
        return 'en';
    }
}

function applyTextDirection(lang: string): void {
    document.documentElement.dir = RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr';
}

const initialLang = getSavedLanguage();
applyTextDirection(initialLang);

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(routes, withHashLocation()),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideTranslateService({
            lang: initialLang,
            fallbackLang: 'en'
        }),
        provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'system'
                }
            }
        }),
        ApplicationService
    ]
})
    .catch((err) => console.error(err));
