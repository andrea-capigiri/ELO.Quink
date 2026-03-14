
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../environments/environment';
import { ApplicationService } from '../_shared/application.service';
import { BreakpointObserver } from '@angular/cdk/layout';

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

}
