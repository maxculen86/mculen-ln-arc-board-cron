import React from 'react';
import Html from './html';
import buildEmbedCll from '../../../common/utils/embedCllHelper';

function EmbedCll({ data = {} }) {
    const { _id = '' } = data;
    const content = buildEmbedCll(data);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!content) return <></>;

    return <Html data={{ content, _id }} />;
}

EmbedCll.arcType = 'canchallena';
export default EmbedCll;
