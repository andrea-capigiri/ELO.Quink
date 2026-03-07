import { environment } from "../../environments/environment";
import { BookmarkItem } from "../app.component";
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

    public topBookmarks: BookmarkItem[] = [];
    public bookmarks: BookmarkItem[] = [];

    public bookmarks_source: any[] = !environment.production ? [{
        children: [
            {
                id: '1', parentId: '0', title: 'Bookmarks Bar',
                children: [
                    { id: '10', parentId: '1', title: 'Facebook', url: 'https://www.facebook.com' },
                    { id: '11', parentId: '1', title: 'YouTube', url: 'https://www.youtube.com' },
                    { id: '12', parentId: '1', title: 'Wikipedia', url: 'https://www.wikipedia.org' },
                    { id: '13', parentId: '1', title: 'Reddit', url: 'https://www.reddit.com' },
                    {
                        id: '14', parentId: '1', title: 'News',
                        children: [
                            { id: '140', parentId: '14', title: 'BBC', url: 'https://www.bbc.com' },
                            { id: '141', parentId: '14', title: 'CNN', url: 'https://www.cnn.com' },
                            { id: '142', parentId: '14', title: 'Reuters', url: 'https://www.reuters.com' },
                        ]
                    },
                    { id: '15', parentId: '1', title: 'Amazon', url: 'https://www.amazon.com' },
                    { id: '16', parentId: '1', title: 'GitHub', url: 'https://www.github.com' },
                ]
            },
            {
                id: '2', parentId: '0', title: 'Other Bookmarks',
                children: [
                    { id: '20', parentId: '2', title: 'Google', url: 'https://www.google.com' },
                    { id: '21', parentId: '2', title: 'Twitter', url: 'https://www.twitter.com' },
                    { id: '22', parentId: '2', title: 'Netflix', url: 'https://www.netflix.com' },
                    { id: '23', parentId: '2', title: 'Spotify', url: 'https://www.spotify.com' },
                    { id: '24', parentId: '2', title: 'Stack Overflow', url: 'https://stackoverflow.com' },
                ]
            }
        ]
    }] : [];

    constructor() {
        this._getBookmarks().then(res => {
            let rootNode = res[0]?.children;
            this.topBookmarks = (!!rootNode) ? this._mapData(rootNode[1])?.children?.filter(t => t.type == 'bookmark') : [];
            this.bookmarks = (!!rootNode) ? this._mapData(rootNode[0])?.children : [];
        });
    }

    private _getBookmarks() {
        if (environment.production == false)
            return Promise.resolve(this.bookmarks_source);

        return window.chrome.bookmarks.getTree();
    }

    private _getFaviconURL(u: string) {
        if (!environment.production)
            return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="%23888"><rect width="32" height="32" rx="4"/></svg>';

        const url = new URL(chrome.runtime.getURL("/_favicon/"));
        url.searchParams.set("pageUrl", u);
        url.searchParams.set("size", "32");
        return url.toString();
    }

    private _mapData(item: any): BookmarkItem {
        return <BookmarkItem>{
            type: (!!item.children && item.children.length > 0 && !item.url) ? 'folder' : 'bookmark',
            expanded: false,
            id: item.id,
            parentId: item.parentId,
            title: item.title,
            iconSrc: this._getFaviconURL(item.url),
            url: item.url,
            children: (!!item.children && item.children.length > 0) ? Object.values(item.children).map(c => this._mapData(c)) : []
        };
    }
}