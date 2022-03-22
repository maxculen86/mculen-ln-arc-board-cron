/* eslint-disable react/require-default-props */
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
    }),
    outputType: PropTypes.string
};

export default Consumer(wikiAuthor);
