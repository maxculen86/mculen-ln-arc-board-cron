import { useState, useEffect } from 'react';
import safeJSONParse from '../../../../../private-global/common/utils/safeJSONParse';
import { addToast, TOAST } from '../../../bookmark/api/_helper';

export default function useIsomorphicPopupHandling() {
    const [modalData, setModalData] = useState({
        isVisible: false,
        data: {}
    });

    const handleData = data => {
        const {
            ids = [],
            collectionArticles = [],
            carouselTitle = '',
            fatherType = ''
        } = data || {};

        const idSet = new Set(ids);
        const allArticles = safeJSONParse(
            localStorage.getItem('bookmarkedItems')
        );

        if (allArticles.length >= 150) {
            addToast({
                variant: TOAST.ERROR.VARIANT,
                title: TOAST.ERROR.TITLE,
                message: TOAST.ERROR.MESSAGE.LIMIT_BOOKMARKS
            });

            return;
        }

        const bookmarkedArticles = allArticles.filter(({ bookmarkTypeId }) => {
            if (idSet.has(bookmarkTypeId)) {
                idSet.delete(bookmarkTypeId);
                return true;
            }
            return false;
        });

        const noBookmarkedArticles = Array.from(idSet);

        const deleteBookmarks =
            bookmarkedArticles.length &&
            bookmarkedArticles.length === ids.length;

        setModalData({
            isVisible: !deleteBookmarks,
            data: {
                ...(deleteBookmarks
                    ? { bookmarkedArticles }
                    : { noBookmarkedArticles }),
                ...((collectionArticles.length && { collectionArticles }) ||
                    {}),
                carouselTitle,
                fatherType
            }
        });
    };

    useEffect(() => {
        window?.LN?.observable?.subscribe('openModal', handleData);
        return () => {
            window?.LN?.observable?.unsubscribe('openModal', handleData);
        };
    }, []);

    const close = customActions => {
        if (typeof customActions === 'function') {
            customActions();
        }

        setModalData({
            isVisible: false,
            data: {}
        });
    };

    return {
        openModal: handleData,
        close,
        modalData
    };
}
