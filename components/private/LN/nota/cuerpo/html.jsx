/* eslint-disable react/no-danger */
import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import HtmlPym from './htmlPym';

const Html = props => {
    const { data } = props;
    const { content } = data || { content: null };
    const { _id: id } = data || '';
    const parser = useRef();

    if (!content) return null;

    if (!parser.current) {
        parser.current = new DOMParser();
    }

    /* let markup = content.replace(/'/g, '"');
    markup = `<iframe class="pym" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;" frameborder="0" scrolling="no" srcdoc='${markup}'></iframe>`; */

    return parser.current
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
    );
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
