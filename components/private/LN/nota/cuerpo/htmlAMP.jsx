/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';

// const hasOptaElements = content => content.includes('opta-widget');

const HtmlAMP = props => {
    const { data } = props;
    const { content } = data || { content: null };

    return (
        <div className="com-embed --html">
            <amp-iframe
                width="360"
                height="300"
                sandbox="allow-scripts allow-same-origin"
                frameborder="0"
                resizable="resizable"
                layout="responsive"
                src={content}
            >
                <div overflow="overflow" tabIndex="0" role="button">
                    Ver mas
                </div>
                <amp-img
                    layout="fill"
                    src={content}
                    placeholder="placeholder"
                />
            </amp-iframe>
        </div>
    );
};

// Con esto estaba antes
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
