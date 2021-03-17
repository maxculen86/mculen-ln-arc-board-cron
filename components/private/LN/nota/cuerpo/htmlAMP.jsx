import React from 'react';
import { OPTA_WIDGET_URL } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

const hasOptaElements = content => content.includes('opta-widget');

const formatContent = content => {
    const DOMElement = content.match(/src="(.*?)"/g);

    return DOMElement
        ? DOMElement.map(x => x.replace(/src=/g, '').replace(/\"/g, '')).join()
        : content;
};

const HtmlAMP = props => {
    const { data } = props;
    const { globalContent } = useAppContext();
    const { _id: idNote } = globalContent;
    const { content = null, width = '300', height = '3000', _id: idRawHtml } =
        data || {};

    let urlForOpta = null;
    if (hasOptaElements(content)) {
        urlForOpta = `${OPTA_WIDGET_URL}/${idRawHtml}/${idNote}/?_website=la-nacion-ar&outputType=opta`;
    }

    const contentSrc = formatContent(content);

    return (
        <div className="com-embed --html">
            <amp-iframe
                width={width}
                height={height}
                sandbox="allow-scripts allow-same-origin"
                layout="responsive"
                src={urlForOpta || contentSrc}
            >
                <amp-img
                    layout="fill"
                    src={contentSrc}
                    placeholder="placeholder"
                />
            </amp-iframe>
        </div>
    );
};

HtmlAMP.arcType = 'raw_html';
HtmlAMP.outputType = 'amp';
HtmlAMP.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default HtmlAMP;
