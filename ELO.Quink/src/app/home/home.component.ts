import { Component, inject } from '@angular/core';
import { ApplicationService } from '../_shared/application.service';
import { SettingsService } from '../_shared/settings.service';
import { BookmarksTopComponent } from '../bookmarks-top/bookmarks-top.component';
import { BookmarksComponent } from '../bookmarks/bookmarks.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        BookmarksTopComponent,
        BookmarksComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public _service = inject(ApplicationService);
    public settings = inject(SettingsService);
}
