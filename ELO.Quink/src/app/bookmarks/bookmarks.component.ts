import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { SettingsService } from '../_shared/settings.service';

@Component({
    selector: 'app-bookmarks',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        ButtonModule,
    ],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {

    emptyDismissed = localStorage.getItem('bookmarks-empty-dismissed') === 'true';

    constructor(
        public _service: ApplicationService,
        public settings: SettingsService
    ) { }

    public dismissEmpty() {
        this.emptyDismissed = true;
        localStorage.setItem('bookmarks-empty-dismissed', 'true');
    }

    public editBookmarks(id: number | null = null) {
        this._service.navigateTo(environment.favoriteEditorPath + (!!id ? '?id=2' : ''));
    }

    public calculatePadding(level: number) {
        let base = 8;
        let padding = 12;
        if (level == 0) return base;
        return (base + (level * padding));
    }
}
