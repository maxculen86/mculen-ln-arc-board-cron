import React, { useState, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../text';
import ComButton from '../com-button';
import BookmarkList from './BookmarkList';
import HelperBookmark from './HelperBookmark';
import useListBookmarks from '../hooks/bookmark/useListBookmarks';
import findTermica from '../utils/findTermica';
import getToken from '../utils/getToken';
import '../../../../resources/dist/css/ln/components/bookmark.css';
import Barrier from '../barrier/Barrier';
import { GlobalContext } from '../context/globalContext';
import Toast from '../toast/Toast';
import get from '../utils/get';

const BookmarkLayout = () => {
    const [showHelper, setShowHelper] = useState(false);
    const [toast, setToast] = useState(false);
    const { state, dispatch } = useContext(GlobalContext);
    const isSuscriber = get(state, 'loginData.subscription', false);

    const {
        bookmarks,
        morePages,
        getNextPage,
        loading,
        deleteArticle
    } = useListBookmarks(findTermica('bookmark_web'), getToken(), isSuscriber);

    return (
        <div className="bookmark-layout">
            <div className="bookmark-header">
                <Text tag="h2" size="--xs" font="--sueca">
                    <span className="--font-bold">
                        {`${Object.entries(bookmarks).length} `}
                    </span>
                    <span>notas guardadas</span>
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
                />
            )}

            {toast && toast.status && (
                <Toast data={toast} handleTimeout={() => setToast(false)} />
            )}
        </div>
    );
};

BookmarkLayout.propTypes = {
    data: PropTypes.shape([])
};
BookmarkLayout.defaultProps = {
    data: []
};
export default BookmarkLayout;
