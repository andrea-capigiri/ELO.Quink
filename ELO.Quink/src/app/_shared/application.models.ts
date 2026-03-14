export class BookmarkItem {
    public type: 'folder' | 'bookmark' = 'folder';
    public expanded: boolean = false;
    public dateAdded: Date | null = null;
    public id: string | null = null;
    public index: number | null = null;
    public parentId: string | null = null;
    public title: string | null = null;
    public iconSrc: string | null = null;
    public iconSrcFallback: string | null = null;
    public url: string | null = null;
    public children: BookmarkItem[] = [];
}
