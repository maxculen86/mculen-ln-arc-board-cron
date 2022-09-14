import React, { useState, useContext } from 'react';
import Text from '../text';
import ComButton from '../com-button';
import BookmarkList from './BookmarkList';
import HelperBookmark from './HelperBookmark';
import useListBookmarks from '../hooks/bookmark/useListBookmarks';
import useCountBookmarks from '../hooks/bookmark/useCountBookmarks';
import useTermica from '../hooks/useTermica';
import getToken from '../utils/getToken';
import Barrier from '../barrier/Barrier';
import { GlobalContext } from '../context/globalContext';
import handleCookie from '../../LN/common/utils/handleCookie';
import ShowToast from '../../LN/common/utils/showToast';
import '../../../../resources/dist/css/ln/components/bookmark.css';

const BookmarkLayout = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [showHelper, setShowHelper] = useState(false);
    const token = getToken();
    const termica = useTermica('bookmark_web');
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

            {state.showModal.origin === 'bookmark' && (
                <Barrier
                    type={state.showModal.typeAlert}
                    handleBarrier={() => {
                        dispatch({
                            type: 'SHOW_MODAL',
                            payload: {
                                open: false
                            }
                        });
                    }}
                    bookmarkId={state.showModal.data}
                    deleteArticle={deleteArticle}
                    substractOne={substractOne}
                    dispatch={dispatch}
                />
            )}

            <ShowToast />
        </div>
    );
};

export default BookmarkLayout;
