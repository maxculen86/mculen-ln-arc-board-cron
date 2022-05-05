import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../../private/common/text';
import BookmarkLayout from '../../private/common/bookmark/BookmarkLayout';
import '../../../resources/dist/css/ln/pages/bookmark.css';

const MisNotasFeature = ({ id: featureId }) => {
    return (
        <div id={featureId} htmlOnly persistent>
            <div className="bookmark">
                <div className="title">
                    <Text tag="h1" size="--l" font="--sueca" weight="bold">
                        Mis notas
                    </Text>
                    <Text tag="a" size="--twoxs" font="--sueca" weight="bold">
                        Guardadas
                    </Text>
                </div>
                <BookmarkLayout notes={0} />
            </div>
        </div>
    );
};

MisNotasFeature.label = 'LN Mis Notas';

MisNotasFeature.propTypes = { id: PropTypes.string.isRequired };

export default MisNotasFeature;
