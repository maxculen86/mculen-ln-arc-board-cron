import React, { useState, useContext } from 'react';
import Text from '../text';
import ComButton from '../com-button';
import BookmarkList from './BookmarkList';
import HelperBookmark from './HelperBookmark';
import useListBookmarks from '../hooks/bookmark/useListBookmarks';
import useCountBookmarks from '../hooks/bookmark/useCountBookmarks';
import findTermica from '../utils/findTermica';
import getToken from '../utils/getToken';
import Barrier from '../barrier/Barrier';
import { GlobalContext } from '../context/globalContext';
import Toast from '../toast/Toast';
import handleCookie from '../../LN/common/utils/handleCookie';
import '../../../../resources/dist/css/ln/components/bookmark.css';

const BookmarkLayout = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [showHelper, setShowHelper] = useState(false);
    const [toast, setToast] = useState(false);
    const token = getToken();
    const termica = findTermica('bookmark_web');
    const { getCookie } = handleCookie();
    const productoPremiumId = getCookie('ProductoPremiumId');
    const isSubscribed = productoPremiumId && productoPremiumId.includes('2');

    const {
        bookmarks,
        morePages,
        getNextPage,
        loading,
        deleteArticle
    } = useListBookmarks(termica, token, isSubscribed);

    const { bookmarkCount, substractOne } = useCountBookmarks(
        termica,
        token,
        isSubscribed
    );

    return (
        <div className="bookmark-layout">
            <div className="bookmark-header">
                <Text tag="h2" size="--xs" font="--sueca">
                    <span className="--font-bold">{bookmarkCount || 0}</span>
                    <span>
                        {bookmarkCount === 1
                            ? ' nota guardada'
                            : ' notas guardadas'}
                    </span>
                </Text>
                <ComButton
                    classCondition="help"
                    iconName="lamp"
                    size="--fivexs"
                    weight="bold"
                    onClick={() => setShowHelper(!showHelper)}
                >
                    AYUDA
                </ComButton>
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
            />
            <HelperBookmark />

            {state.deleteBookmarkId && (
                <Barrier
                    type="delete-note"
                    handleBarrier={() => {
                        dispatch({
                            type: 'SHOW_MODAL_BARRIER',
                            payload: {
                                bookmarkId: false
                            }
                        });
                    }}
                    bookmarkId={state.deleteBookmarkId}
                    setToast={setToast}
                    deleteArticle={deleteArticle}
                    substractOne={substractOne}
                />
            )}

            {toast && toast.status && (
                <Toast data={toast} handleTimeout={() => setToast(false)} />
            )}
        </div>
    );
};

export default BookmarkLayout;
