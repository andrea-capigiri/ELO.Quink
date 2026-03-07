import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationService } from './app/_shared/application.service';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimationsAsync(),
        ApplicationService
    ]
})
    .catch((err) => console.error(err));
