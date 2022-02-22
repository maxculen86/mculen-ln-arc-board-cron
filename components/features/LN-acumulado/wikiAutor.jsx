import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import WikiAuthor from '../../private/LN/acumulado/author/wikiAuthor';
import { wikiAuthorPropTypes } from '../../private/common/utils/propTypesHelper';

const wikiAuthor = ({ id: featureId, globalContent, outputType }) => {
    return (
        <Static id={featureId} htmlOnly persistent>
            <WikiAuthor data={globalContent} outputType={outputType} />
        </Static>
    );
};

wikiAuthor.label = 'LN-Acumulado-Wiki-Autor';

wikiAuthor.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        ...wikiAuthorPropTypes
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default Consumer(wikiAuthor);
