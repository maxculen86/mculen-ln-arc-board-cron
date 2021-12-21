import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import WikiAuthor from '../../private/LN/acumulado/author/wikiAuthor';
import withStatic from '../../private/common/hocs/withStatic';
import { wikiAuthorPropTypes } from '../../private/common/utils/propTypesHelper';

const wikiAuthor = ({ globalContent, outputType }) => {
    return <WikiAuthor data={globalContent} outputType={outputType} />;
};

wikiAuthor.label = 'LN-Acumulado-Wiki-Autor';

wikiAuthor.propTypes = {
    globalContent: PropTypes.shape({
        ...wikiAuthorPropTypes
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

export default withStatic(Consumer(wikiAuthor));
