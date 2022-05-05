import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../text';
import Icon from '../icon';
import EmptyBookmark from './EmptyBookmark';
import DeleteNote from './DeleteNote';
import '../../../../resources/dist/css/ln/components/bookmark.css';

const BookmarkLayout = ({ notes }) => {
    return (
        <section className="bookmark-layout">
            <div className="bookmark-header">
                <Text tag="h2" size="--xs" font="--sueca">
                    <span className="--font-bold">{`${notes} `}</span>
                    <span>notas guardadas</span>
                </Text>
                <div className="help">
                    <Icon name="lamp" />
                    <Text size="--fivexs" font="--arial" weight="bold">
                        AYUDA
                    </Text>
                </div>
            </div>
            <DeleteNote />
            {notes === 0 ? (
                <div>
                    <EmptyBookmark />
                </div>
            ) : (
                <div>BOOKMARK LIST</div>
            )}
        </section>
    );
};

BookmarkLayout.propTypes = {
    notes: PropTypes.number
};
BookmarkLayout.defaultProps = {
    notes: 0
};
export default BookmarkLayout;
