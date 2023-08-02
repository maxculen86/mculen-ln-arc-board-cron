/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Temas from '../../private/LN/nota/apertura/tags';
import StaticContent from '../../private/common/staticContent';

// TODO Fix props y hacer unit test

const temas = props => {
    const {
        globalContent: { taxonomy }
    } = props;
    const { tags, sections } = taxonomy || {};

    return (
        <StaticContent>
            <Temas tags={tags} sections={sections} destacado temas />
        </StaticContent>
    );
};

temas.label = 'LN-Nota-Temas';

temas.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.shape()),
            sections: PropTypes.arrayOf(PropTypes.shape())
        })
    })
};

export default Consumer(temas);
