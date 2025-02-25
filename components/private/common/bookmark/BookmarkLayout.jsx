import React, { useState } from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Dialog } from '@ln/common-ui-dialog';
import { useDisclosure } from '@ln/hooks';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import Text from '../text';
import BookmarkList from './BookmarkList';
import HelperBookmark from './HelperBookmark';
import useListBookmarks from '../hooks/bookmark/useListBookmarks';
import useCountBookmarks from '../hooks/bookmark/useCountBookmarks';
import useTermica from '../hooks/useTermica';
import ShowToast from '../toast/showToast';
import { isSubscribed, SUBSCRIBED_HELPER } from '../auth/helper/loginHelper';
import '../../../../resources/dist/css/ln/components/bookmark.css';
import useAuthManager from '../auth/hooks/useAuthManager';
import { useToast } from '../toast/hooks/useToast';
import BarrierDeleteNote from '../../../features/LN-10-global/common/barrierDeleteNote/default';
import {
    BookmarkContextProvider,
    useBookmarkContext
} from './hooks/BookmarkContext';

function BookmarkLayoutContent() {
    const [showHelper, setShowHelper] = useState(false);
    const termica = useTermica('bookmark_web');
    const subscription = isSubscribed(SUBSCRIBED_HELPER.LN);
    const { token, accessToken } = useAuthManager();
    const { bookmarks, morePages, getNextPage, loading, deleteArticle } =
        useListBookmarks({
            termicaBookmark: termica,
            subscription,
            token,
            accessToken
        });

    const { bookmarkCount, substractOne } = useCountBookmarks({
        termicaBookmark: termica,
        subscription,
        token,
        accessToken
    });

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    const {
        isToastOpen,
        openToast,
        closeToast,
        toastData,
        handleOperationComplete
    } = useToast();

    const { bookmarkId } = useBookmarkContext();

    return (
        <div className="bookmark-layout">
            <div className="bookmark-header">
                <Text tag="h2" size="--l" font="--font-primary">
                    <span className="--font-bold">{bookmarkCount || 0}</span>
                    <span>
                        {bookmarkCount === 1
                            ? ' nota guardada'
                            : ' notas guardadas'}
                    </span>
                </Text>
                <Button
                    onClick={() => setShowHelper(!showHelper)}
                    title="Mostrar guía de ayuda"
                    variant="secondary"
                >
                    <Icon size={16}>
                        <IconSprite name="lightbulb" />
                    </Icon>
                    AYUDA
                </Button>
            </div>
            <HelperBookmark
                show={showHelper}
                handleHelper={() => setShowHelper(!showHelper)}
            />
            <BookmarkList
                data={bookmarks}
                morePages={morePages}
                getNextPage={getNextPage}
                loading={loading}
                openBarrier={openBarrier}
            />
            <HelperBookmark />
            <Dialog
                isOpen={isBarrierOpen}
                onClose={closeBarrier}
                position="center"
                id="audio-player-barrier"
                classnames={{
                    base: 'w-100 w-720_md bg-transparent px-16 w-shadow-up-md'
                }}
                overlay
                closeOnClickOutside
            >
                <BarrierDeleteNote
                    closeBarrier={closeBarrier}
                    bookmarkId={bookmarkId}
                    deleteArticle={deleteArticle}
                    substractOne={substractOne}
                    onOperationComplete={handleOperationComplete}
                    openToast={openToast}
                />
            </Dialog>
            <ShowToast
                isOpen={isToastOpen}
                onClose={closeToast}
                {...toastData}
            />
        </div>
    );
}

function BookmarkLayout() {
    return (
        <BookmarkContextProvider>
            <BookmarkLayoutContent />
        </BookmarkContextProvider>
    );
}

export default BookmarkLayout;
