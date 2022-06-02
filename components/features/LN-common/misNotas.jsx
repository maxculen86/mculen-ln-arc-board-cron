import React from 'react';
import PropTypes from 'fusion:prop-types';
import Text from '../../private/common/text';
import BookmarkLayout from '../../private/common/bookmark/BookmarkLayout';
import '../../../resources/dist/css/ln/pages/bookmark.css';

const MisNotasFeature = ({ id: featureId }) => {
    return (
        <div id={featureId} htmlOnly persistent>
            <section className="bookmark">
                <div className="title">
                    <Text tag="h1" size="--l" font="--sueca" weight="bold">
                        Mis notas guardadas
                    </Text>
                    <Text
                        extraClass="--saved"
                        size="--twoxs"
                        font="--sueca"
                        weight="bold"
                    >
                        Guardadas
                    </Text>
                </div>
                <BookmarkLayout />
            </section>
        </div>
    );
};

MisNotasFeature.label = 'LN Mis Notas';

MisNotasFeature.propTypes = { id: PropTypes.string.isRequired };

export default MisNotasFeature;
