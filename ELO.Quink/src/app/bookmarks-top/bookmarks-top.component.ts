
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-bookmarks-top',
    imports: [
        MatRippleModule,
        MatTooltipModule,
        MatIconModule,
        ButtonModule
    ],
    templateUrl: './bookmarks-top.component.html',
    styleUrl: './bookmarks-top.component.scss'
})
export class BookmarksTopComponent {

    showAll = false;
    columns = 8;
    emptyDismissed = localStorage.getItem('bookmarks-top-empty-dismissed') === 'true';

    private _breakpointObserver = inject(BreakpointObserver);

    constructor(
        public _service: ApplicationService
    ) {
        this._breakpointObserver.observe([
            '(max-width: 480px)',
            '(max-width: 600px)',
            '(max-width: 768px)',
            '(max-width: 900px)'
        ]).subscribe(result => {
            if (result.breakpoints['(max-width: 480px)']) this.columns = 4;
            else if (result.breakpoints['(max-width: 600px)']) this.columns = 5;
            else if (result.breakpoints['(max-width: 768px)']) this.columns = 6;
            else if (result.breakpoints['(max-width: 900px)']) this.columns = 7;
            else this.columns = 8;
        });
    }

    get maxItems(): number {
        return this.columns * 2;
    }

    get visibleBookmarks(): any[] {
        const all = this._service.topBookmarks ?? [];
        if (this.showAll) return all;
        if (all.length <= this.maxItems) return all;
        return all.slice(0, this.maxItems - 1);
    }

    get hasOverflow(): boolean {
        return !this.showAll && (this._service.topBookmarks?.length ?? 0) > this.maxItems;
    }

    public dismissEmpty() {
        this.emptyDismissed = true;
        localStorage.setItem('bookmarks-top-empty-dismissed', 'true');
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
