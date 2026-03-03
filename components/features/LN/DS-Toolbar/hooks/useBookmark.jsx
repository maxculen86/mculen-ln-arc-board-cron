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

            renderToasts({
                title: statusConfig.title,
                description: statusConfig.message,
                color:
                    statusConfig.variant === 'danger'
                        ? 'error'
                        : statusConfig.variant,
                buttonProps: {
                    ...statusConfig.buttonProps,
                    color: 'custom',
                    variant: 'outline',
                    className:
                        'ds-custom-buttom-toast bg-neutral-1 text-black-default hover:bg-neutral-1-lighten border-black-default w-fit'
                }
            });
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
