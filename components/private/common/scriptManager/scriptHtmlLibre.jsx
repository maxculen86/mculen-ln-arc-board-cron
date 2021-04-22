import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from '../utils/get';

const ScriptHtmlLibre = props => {
    const {
        globalContent: {
            type,
            content_elements: contentElements,
            promo_items: promoItems
        } = {}
    } = props;

    // Este regex se usa para validar que exista algún elemento que contenga la class 'pym'
    const regex = /<.*class=(?:.+pym.+)\/.*?>/gim;

    const hasPymClass =
        (get(promoItems, 'basic.type', '') === 'raw_html' &&
            regex.test(get(promoItems, 'basic.content', ''))) ||
        (contentElements &&
            contentElements.some(
                element =>
                    get(element, 'type', '') === 'raw_html' &&
                    regex.test(get(element, 'content', ''))
            ));

    return (
        (type === 'story' && hasPymClass && (
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pym/1.2.0/pym.v1.min.js" />
        )) ||
        null
    );
};

ScriptHtmlLibre.propTypes = {
    globalContent: PropTypes.shape({
        type: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        content_elements: PropTypes.shape.isRequired
    }).isRequired
};

export default Consumer(ScriptHtmlLibre);
