/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import HtmlPym from './htmlPym';

const hasIframeWithPYM = (domParser, content) => {
    if (!domParser && !domParser.parseFromString) return false;
    return domParser
        .parseFromString(content, 'text/html')
        .querySelectorAll('iframe.pym').length;
};

const Html = props => {
    const { data } = props;
    const { content, _id: idMedia } = data || { content: null };
    const domParser = typeof DOMParser === 'function' && new DOMParser();

    if (!content) return null;

    return hasIframeWithPYM(domParser, content) ? (
        <HtmlPym data={data} />
    ) : (
        <div
            id={`anexo-${idMedia}`}
            className="com-embed --html"
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
};

Html.arcType = 'raw_html';
Html.outputType = 'default';
Html.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string
    })
};
Html.defaultProps = {
    data: {
        _id: '',
        content: ''
    }
};

export default Html;
