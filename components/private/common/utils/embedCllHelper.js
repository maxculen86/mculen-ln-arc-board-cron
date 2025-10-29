import get from './get';

const VALID_EMBEDS_TYPES = [
    'isGroupTable',
    'isStandingsTable',
    'isMatchDetail',
    'isAnnualTable',
    'isAverageTable'
];

function buildEmbedCll(data = {}) {
    const widgetUrl = get(data, 'embed.config.widgetUrl');
    const embedType = get(data, 'embed.config.embedType');

    if (!widgetUrl || !VALID_EMBEDS_TYPES.includes(embedType)) {
        return null;
    }

    const content = `<div class="p-overflow_max767">
                        <iframe
                            class="pym"
                            src="${widgetUrl}"
                            title="Embebido canchallena"
                            loading="lazy">
                        </iframe>
                    </div>`;

    return content;
}

export default buildEmbedCll;
