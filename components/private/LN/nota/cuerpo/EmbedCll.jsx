import React from 'react';
import PropTypes from 'prop-types';
import Html from './html';
import buildEmbedCll from '../../../common/utils/embedCllHelper';

function EmbedCll({ data = {} }) {
    const { _id = '' } = data;
    const content = buildEmbedCll(data);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!content) return <></>;

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
