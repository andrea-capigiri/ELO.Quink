import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ApplicationService } from '../_shared/application.service';

@Component({
    selector: 'app-bookmarks-top',
    standalone: true,
    imports: [
        TranslateModule,
        TooltipModule,
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

    get hasAnyOverflow(): boolean {
        return (this._service.topBookmarks?.length ?? 0) > this.maxItems;
    }

    get alwaysVisibleItems(): any[] {
        const all = this._service.topBookmarks ?? [];
        if (!this.hasAnyOverflow) return all;
        return all.slice(0, this.maxItems);
    }

    get overflowItems(): any[] {
        const all = this._service.topBookmarks ?? [];
        if (!this.hasAnyOverflow) return [];
        return all.slice(this.maxItems);
    }

    public dismissEmpty() {
        this.emptyDismissed = true;
        localStorage.setItem('bookmarks-top-empty-dismissed', 'true');
    }
}
