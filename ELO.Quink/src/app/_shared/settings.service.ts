import { Injectable, signal } from '@angular/core';

export type LayoutMode = 'all' | 'top-only' | 'list-only';

@Injectable({ providedIn: 'root' })
export class SettingsService {

    showTop = signal(this._load('settings-show-top', true));
    showList = signal(this._load('settings-show-list', true));

    setShowTop(value: boolean) {
        this.showTop.set(value);
        localStorage.setItem('settings-show-top', String(value));
    }

    setShowList(value: boolean) {
        this.showList.set(value);
        localStorage.setItem('settings-show-list', String(value));
    }

    private _load(key: string, def: boolean): boolean {
        const v = localStorage.getItem(key);
        return v === null ? def : v === 'true';
    }
}
