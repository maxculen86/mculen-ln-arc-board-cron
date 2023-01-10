/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import WikiAuthor from '../../private/LN/acumulado/author/wikiAuthor';
import { wikiAuthorPropTypes } from '../../private/common/utils/propTypesHelper';
import StaticContent from '../../private/common/staticContent';

const wikiAuthor = ({ globalContent, outputType }) => {
    return (
        <StaticContent>
            <WikiAuthor data={globalContent} outputType={outputType} />
        </StaticContent>
    );
};

wikiAuthor.label = 'LN-Acumulado-Wiki-Autor';

wikiAuthor.propTypes = {
    globalContent: PropTypes.shape({
        ...wikiAuthorPropTypes
    }),
    outputType: PropTypes.string
};

export default Consumer(wikiAuthor);
