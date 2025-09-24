import React from 'react';
import { AdminErrorRenderer, NullRenderer, CardRenderer } from '../components';
import { getRenderType } from '../_helper';

const useArticleRenderer = data => {
    const renderType = getRenderType(data);

    const renderMap = {
        adminError: (
            <AdminErrorRenderer featureId={data.featureId} error={data.error} />
        ),
        null: <NullRenderer />,
        card: <CardRenderer cardProps={data.cardProps} />
    };

    return renderMap[renderType];
};

export default useArticleRenderer;
