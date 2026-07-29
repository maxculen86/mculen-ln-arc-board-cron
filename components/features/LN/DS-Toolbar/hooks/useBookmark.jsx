import { useEffect, useState } from 'react';
import useCheckBookmark from '../../../../private/common/hooks/bookmark/useCheckBookmark';
import toggleBookmark, {
    getStatusMessage
} from '../../../../private/common/utils/bookmarkHelper';
import renderToasts from '../../../ui/ln/toastsContainer/renderToast';
import useTermica from '../../../../private/common/hooks/useTermica';

export default function useBookmark({
    noteId,
    suscription,
    token,
    accessToken,
    globalContent,
    openBarrier
}) {
    const [bookmark, setBookmark] = useState('');

    const termicaBookmark = useTermica('bookmark_web');

    const checkedBookmark = useCheckBookmark(
        termicaBookmark,
        token,
        accessToken,
        noteId,
        suscription
    );

    useEffect(() => {
        if (termicaBookmark) setBookmark(checkedBookmark);
    }, [termicaBookmark, checkedBookmark]);

    const onToggleBookmark = () => {
        if (!suscription) {
            openBarrier();
            return;
        }

        toggleBookmark({
            isDelete: bookmark,
            setBookmark,
            _globalContent: globalContent
        }).then(({ status, bookmarkContent }) => {
            const statusConfig = getStatusMessage(status, bookmarkContent);

            renderToasts(statusConfig);
        });
    };

    const bookmarkName = bookmark ? 'bookmark-filled' : 'bookmark';

    return {
        onToggleBookmark,
        bookmarkName,
        bookmark,
        termicaBookmark
    };
}
