import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import config from '../../../../properties/sites/la-nacion-ar';

const hasOptaElements = contentElements =>
    contentElements.some(
        contentElement =>
            contentElement.type === 'raw_html' &&
            contentElement.content.includes('opta-widget')
    );

const OptaEmbed = props => {
    const {
        globalContent: { type, content_elements: contentElements }
    } = props;

    /* if (!contentElements) return null;
    if (!hasOptaElements(contentElements)) return null;
    if (type !== 'story') return null; */
    const script = `
        var opta_settings = {
            subscription_id: '${config.optaConfig.subscription_id}',
            language: '${config.optaConfig.language}',
            timezone: '${config.optaConfig.timezone}'
        };
    `;
    const style = `https://secure.widget.cloud.opta.net/v3/css/v3.all.opta-widgets.css`;
    return (
        <>
            <link rel="stylesheet" href={style} />
            <script src="https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js" />
            <script dangerouslySetInnerHTML={{ __html: script }} />
            <noscript>Your browser does not suport javascript</noscript>
        </>
    );
};

OptaEmbed.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(OptaEmbed);
