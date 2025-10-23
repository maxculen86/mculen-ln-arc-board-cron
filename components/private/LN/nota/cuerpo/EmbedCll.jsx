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

    const content = `
    <div class="p-overflow_max767">
        <iframe
            class="pym"
            src="${widgetUrl}"
            title="Embebido canchallena"
            loading="lazy">
        </iframe>
    </div>`;

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
