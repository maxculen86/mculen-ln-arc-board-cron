/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'fusion:prop-types';

const hasOptaElements = content => content.includes('opta-widget');

const HtmlAMP = props => {
    const { data } = props;
    const { content } = data || { content: null };

    return (
        <>
            {hasOptaElements(content) && (
                <div className="com-embed --html">
                    <amp-iframe
                        width="540"
                        height="300"
                        sandbox="allow-scripts allow-same-origin"
                        layout="responsive"
                        frameborder="0"
                        src="https://proxy.lanacion.com.ar:3000/?url=http://arc.lanacion.com.ar/opta/?_website=la-nacion-ar&opta=true&outputType=opta"
                    />
                </div>
            )}
        </>
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
