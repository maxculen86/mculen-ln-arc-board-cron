import React from 'react';
import Text from '../../private/common/text';
import BookmarkLayout from '../../private/common/bookmark/BookmarkLayout';
import '../../../resources/dist/css/ln/pages/bookmark.css';

const MisNotasFeature = () => {
    return (
        <section className="bookmark">
            <div className="title">
                <Text tag="h1" size="--l" font="--sueca" weight="bold">
                    Mis notas guardadas
                </Text>
            </div>
            <BookmarkLayout />
        </section>
    );
};

MisNotasFeature.label = 'LN Mis Notas';

export default MisNotasFeature;
