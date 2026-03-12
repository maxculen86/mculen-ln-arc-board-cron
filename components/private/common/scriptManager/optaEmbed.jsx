/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import config from '../../../../properties/sites/la-nacion-ar';

const optaWidget = 'opta-widget';

const childrenHasOpta = (children = []) =>
    children.some(elem =>
        get(elem, 'props.customFields.html', '').includes(optaWidget)
    );

const hasOptaElements = (contentElements, renderables, promoItems) =>
    (contentElements &&
        contentElements.some(
            contentElement =>
                get(contentElement, 'type', '') === 'raw_html' &&
                get(contentElement, 'content', '').includes(optaWidget)
        )) ||
    (renderables &&
        renderables.some(
            elem =>
                get(elem, 'collection', '') === 'chains' &&
                get(elem, 'type', '') === 'Ln_Caja_Manual' &&
                get(elem, 'props.customFields.hideCaja', false) !== true &&
                childrenHasOpta(elem.children)
        )) ||
    (promoItems &&
        get(promoItems, 'apertura_multimedia.type', '') === 'raw_html' &&
        get(promoItems, 'apertura_multimedia.content', '').includes(
            optaWidget
        ));

function OptaEmbed(props) {
    const {
        globalContent: {
            type,
            content_elements: contentElements,
            promo_items: promoItems
        },
        renderables
    } = props;
    const { deployment, contextPath } = useAppContext();

    if (type === 'story' && !contentElements) return null;
    if (!hasOptaElements(contentElements, renderables, promoItems)) return null;

    const {
        subscription_id: subscriptionId,
        language,
        timezone
    } = {
        ...config.optaConfig
    };

    return (
        <script
            id="script-opta-embed"
            defer
            data-subscriptionId={subscriptionId}
            data-language={language}
            data-timezone={timezone}
            type="text/javascript"
            src={deployment(`${contextPath}/resources/js/LN/optaEmbed.min.js`)}
        />
    );
}

export default Consumer(OptaEmbed);
