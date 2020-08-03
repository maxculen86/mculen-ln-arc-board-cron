/* eslint-disable react/no-danger */
import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import HtmlPym from './htmlPym';

// import ReactDOMServer from 'react-dom/server';

const HtmlToReactParser = require('html-to-react').Parser;

const Html = props => {
    const { data } = props;
    const { content } = data || { content: null };
    const { _id: id } = data || '';
    const parser = useRef();

    if (!content) return null;

    if (!parser.current) {
        parser.current = new DOMParser();
    }

    /* return parser.current
        .parseFromString(content, 'text/html')
        .querySelectorAll('iframe.pym').length ? (
        <HtmlPym data={data} />
    ) : (
        <div
            className="com-embed --html"
            dangerouslySetInnerHTML={{
                __html: parser.current.parseFromString(content, 'text/html')
                    .documentElement.innerHTML
            }}
        />
    ); */

    const markup = content.replace(/'/g, '"');
    return parser.current
        .parseFromString(content, 'text/html')
        .querySelectorAll('iframe.pym').length ? (
        <HtmlPym data={data} />
    ) : (
        <div
            className="com-embed --html"
            dangerouslySetInnerHTML={{
                __html: `<html><head></head><body><header id="header"></header><iframe style="width: 100%; height: 100%;" frameborder="0" scrolling="no" srcdoc='${markup}'></iframe></body></html>`
            }}
        />
    );

    /* const parser = new HtmlToReactParser();
    console.log("######## CONTENT: ", content);
    return <div className="com-embed --html">{parser.parse(content)}</div>; */
};

Html.arcType = 'raw_html';
Html.outputType = 'default';
Html.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        content: PropTypes.string
    }).isRequired
};
Html.defaultPros = {
    data: {
        _id: '',
        content: ''
    }
};

export default Html;
