import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';

import config from '../../../../properties/sites/la-nacion-ar';
import get from '../utils/get';

const childrenHasOpta = (children = []) => {
    return children.some(elem =>
        get(elem, 'props.customFields.html', '').includes('opta-widget')
    );
};

const hasOptaElements = (contentElements, renderables) =>
    (contentElements &&
        contentElements.some(
            contentElement =>
                get(contentElement, 'type') === 'raw_html' &&
                get(contentElement, 'content', '').includes('opta-widget')
        )) ||
    (renderables &&
        renderables.some(
            elem =>
                get(elem, 'collection') === 'chains' &&
                get(elem, 'type') === 'Ln_Caja_Manual' &&
                get(elem, 'props.customFields.hideCaja', false) !== true &&
                childrenHasOpta(elem.children)
        ));

const OptaEmbed = props => {
    const {
        globalContent: { type, content_elements: contentElements },
        renderables
    } = props;

    if (type === 'story' && !contentElements) return null;
    if (!hasOptaElements(contentElements, renderables)) return null;

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
            <script
                async
                src="https://secure.widget.cloud.opta.net/v3/v3.opta-widgets.js"
            />
            <script dangerouslySetInnerHTML={{ __html: script }} />
            <noscript>Your browser does not suport javascript</noscript>
        </>
    );
};

OptaEmbed.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired,
    renderables: PropTypes.arrayOf(PropTypes.obj).isRequired
};

export default Consumer(OptaEmbed);
