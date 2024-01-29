import { useState, useEffect } from 'react';
import getToken from '../../../../../../private/common/utils/getToken';

export default function useIsomorphicPopupHandling() {
    const [modalData, setModalData] = useState({
        isVisible: false,
        data: {}
    });

    const handleData = data => {
        const premiumProduct = getToken('ProductoPremiumId');

        if (typeof premiumProduct !== 'string') {
            window.LN.observable.publish('addToast', {
                variant: 'danger',
                title: 'Error!',
                message: `Redirect to Login`
            });

            return;
        }

        if (!premiumProduct.includes('2')) {
            window.LN.observable.publish('addToast', {
                variant: 'danger',
                title: 'Error!',
                message: `No premium user, redirect to Paywall`
            });

            return;
        }

        const { ids = [], collectionId = '', collectionArticles = [] } =
            data || {};

        const idSet = new Set(ids);
        const allArticles = safeJSONParse(
            localStorage.getItem('bookmarkedItems')
        );

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
                ...((collectionId && { collectionId, collectionArticles }) ||
                    {})
            }
        });
    };

    useEffect(() => {
        window.LN.observable.subscribe('openModal', handleData);
        return () => {
            window.LN.observable.unsubscribe('openModal', handleData);
        };
    }, []);

    const close = customActions => {
        if (customActions) {
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
