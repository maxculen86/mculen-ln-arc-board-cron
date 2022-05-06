import { useContent } from 'fusion:content';

export function useToggleBookmark() {}

export function useCheckBookmark(arcSite, token, noteId) {
    const { data } =
        useContent({
            source: 'bookmarkSource',
            query: {
                arcSite,
                action: 'check',
                token,
                noteData: {
                    id: noteId
                }
            }
        }) || {};
    console.log(
        '🚀 ~ file: bookmarkHelper.js ~ line 7 ~ checkBookmark ~ data',
        data
    );
}

export function useListBookmarks(arcSite, token) {
    const { data } =
        useContent({
            source: 'bookmarkSource',
            query: {
                arcSite,
                action: 'list',
                token
            }
        }) || {};
    console.log(
        '🚀 ~ file: bookmarkHelper.js ~ line 7 ~ checkBookmark ~ data',
        data
    );
}
