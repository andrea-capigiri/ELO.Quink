import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-bookmarks',
    standalone: true,
    imports: [
        CommonModule,
        MatRippleModule,
        MatIconModule,
        MatButtonModule,
        ButtonModule,
    ],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.scss'
})
export class BookmarksComponent {

    emptyDismissed = localStorage.getItem('bookmarks-empty-dismissed') === 'true';

    constructor(
        public _service: ApplicationService
    ) { }

    public dismissEmpty() {
        this.emptyDismissed = true;
        localStorage.setItem('bookmarks-empty-dismissed', 'true');
    }

    public editBookmarks(id: number | null = null) {
        this.navigateTo(environment.favoriteEditorPath + (!!id ? '?id=2' : ''));
    }

    public navigateTo(url: string | null) {
        if (!url) return;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(<any>tabs[0].id, { url: url });
        });
    }
}
