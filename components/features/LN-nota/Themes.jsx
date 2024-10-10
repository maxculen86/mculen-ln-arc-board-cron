import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Tags from '../../private/LN/nota/apertura/tags';

function Themes(props) {
    const {
        globalContent: { taxonomy }
    } = props;
    const { tags, sections } = taxonomy || {};

    return <Tags tags={tags} sections={sections} destacado temas />;
}

Themes.label = 'LN-Nota-Temas';
Themes.lazy = true;

Themes.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.shape()),
            sections: PropTypes.arrayOf(PropTypes.shape())
        })
    }).isRequired
};

export default Consumer(Themes);
