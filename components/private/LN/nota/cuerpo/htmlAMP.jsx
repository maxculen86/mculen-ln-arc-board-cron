import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

const hasOptaElements = content => content.includes('opta-widget');

const HtmlAMP = props => {
    const { data } = props;
    const { globalContent } = useAppContext();
    const { _id: idNote } = globalContent;
    const { content = null, width = '360', height = '300', _id: idRawHtml } =
        data || {};

    let urlForOpta = null;
    if (hasOptaElements(content)) {
        // urlForOpta = `https://arc.lanacion.com.ar/opta-embed/${idRawHtml}/${idNote}/?_website=la-nacion-ar&outputType=opta`;
        urlForOpta = `https://dev.lanacionar.arcpublishing.com/pf/opta-embed/${idRawHtml}/${idNote}/?_website=la-nacion-ar&outputType=opta`;
    }
    // urlForOpta = 'https://sandbox.lanacion.com.ar/opta-embed/?outputType=opta';
    // console.log("urlForOpta", urlForOpta)
    // http://sandbox.lanacion.com.ar/opta-embed/{:id_row_html}/ciencia/test-opta-nid15072020/?outputType=opta
    return (
        <div className="com-embed --html">
            <amp-iframe
                width={width}
                height={height}
                sandbox="allow-scripts allow-same-origin"
                frameborder="0"
                layout="responsive"
                src={urlForOpta || content}
            >
                <amp-img
                    layout="fill"
                    src={content}
                    placeholder="placeholder"
                />
            </amp-iframe>
        </div>
    );
};

// Asi estaba antes
// {hasOptaElements(content) && (
// "https://proxy.lanacion.com.ar:3000/?url=http://arc.lanacion.com.ar/opta/?_website=la-nacion-ar&opta=true&outputType=opta"

HtmlAMP.arcType = 'raw_html';
HtmlAMP.outputType = 'amp';
HtmlAMP.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default HtmlAMP;
