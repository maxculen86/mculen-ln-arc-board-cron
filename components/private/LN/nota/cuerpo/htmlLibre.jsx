/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

const HtmlLibre = props => {
    const {
        outputType,
        globalContent: { _id, content_elements: contentElements } = {}
    } = props;
    const content =
        contentElements[0] && contentElements[0].content
            ? contentElements[0].content
            : undefined;

    return outputType === 'default' ? (
        <div
            key={_id}
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    ) : (
        <></>
    );
};

HtmlLibre.outputType = 'default';
HtmlLibre.propTypes = {
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        content_elements: PropTypes.arrayOf(PropTypes.object)
    })
}.isRequired;

export default Consumer(HtmlLibre);
