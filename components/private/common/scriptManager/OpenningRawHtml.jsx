/* eslint-disable react/no-danger */
import React from 'react';
import parse from 'html-react-parser';

const OpenningRawHTML = ({ contentElements = [] }) => {
    const rawHTMLS = contentElements.filter(
        (contentElement = {}) => contentElement.type === 'raw_html'
    );

    const openning = rawHTMLS.length > 1 && rawHTMLS[0].content;

    return openning ? <>{parse(openning)}</> : <></>;
};

export default OpenningRawHTML;
