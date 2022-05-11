import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../text';
import ComButton from '../com-button';
import BookmarkList from './BookmarkList';
import HelperBookmark from './HelperBookmark';
import '../../../../resources/dist/css/ln/components/bookmark.css';

const BookmarkLayout = ({ data }) => {
    return (
        <div className="bookmark-layout">
            <div className="bookmark-header">
                <Text tag="h2" size="--xs" font="--sueca">
                    <span className="--font-bold">
                        {`${Object.entries(data).length} `}
                    </span>
                    <span>notas guardadas</span>
                </Text>
                <ComButton
                    classCondition="help"
                    iconName="lamp"
                    size="--fivexs"
                    weight="bold"
                >
                    AYUDA
                </ComButton>
            </div>
            <BookmarkList data={data} />
            <HelperBookmark />
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
