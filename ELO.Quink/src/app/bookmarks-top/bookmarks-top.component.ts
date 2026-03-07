import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-bookmarks-top',
    standalone: true,
    imports: [
        CommonModule,
        MatRippleModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './bookmarks-top.component.html',
    styleUrl: './bookmarks-top.component.scss'
})
export class BookmarksTopComponent {

    constructor(
        public _service: ApplicationService
    ) { }

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
