import React from 'react';
import PropTypes from 'prop-types';
import Html from './html';

const VALID_EMBEDS_TYPES = [
    'isGroupTable',
    'isStandingsTable',
    'isMatchDetail',
    'isAnnualTable',
    'isAverageTable'
];

function EmbedCll({ data = {} }) {
    const {
        embed: { config: { widgetUrl = '', embedType = '' } = {} } = {},
        _id = ''
    } = data;

    if (!widgetUrl || !VALID_EMBEDS_TYPES.includes(embedType)) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    }

    const isMatchDetail = embedType === 'isMatchDetail';
    const wrapperClass = `p-overflow_max767 ${isMatchDetail ? 'h-303' : ''}`;
    const innerClass = isMatchDetail ? 'h-100' : '';
    const iframeClass = isMatchDetail ? 'h-100' : 'pym';

    const content = `
        <div class="${wrapperClass}">
            <div class="${innerClass}">
                <iframe
                    class="${iframeClass}"
                    src="${widgetUrl}"
                    title="Embebido canchallena"
                    loading="lazy">
                </iframe>
            </div>
        </div>
        `;

    return <Html data={{ content, _id }} />;
}

EmbedCll.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                widgetUrl: PropTypes.string,
                embedType: PropTypes.string
            })
        }),
        _id: PropTypes.string
    })
}.isRequired;

EmbedCll.arcType = 'canchallena';
export default EmbedCll;
