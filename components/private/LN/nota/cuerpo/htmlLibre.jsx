/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Html from './html';

const HtmlLibre = props => {
    const {
        outputType,
        globalContent: { content_elements: contentElements }
    } = props;

    if (outputType === 'amp') return null;

    const htmlContent = contentElements.find(
        element => element.type === 'raw_html'
    );

    return <Html data={htmlContent} />;
};

HtmlLibre.outputType = 'default';
HtmlLibre.propTypes = {
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.object)
    })
}.isRequired;

export default Consumer(HtmlLibre);
