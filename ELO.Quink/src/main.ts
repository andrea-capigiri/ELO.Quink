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

function getSavedLanguage(): string {
    try {
        const stored = localStorage.getItem(LANGUAGE_KEY);
        return stored === 'en' || stored === 'it' ? stored : 'it';
    } catch {
        return 'it';
    }
}

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideRouter(routes, withHashLocation()),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideTranslateService({
            lang: getSavedLanguage(),
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
