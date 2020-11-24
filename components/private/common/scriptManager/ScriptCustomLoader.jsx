import React from 'react';
import { useAppContext } from 'fusion:context';

const ScriptCustomLoader = () => {
    const { renderables = [] } = useAppContext();
    const features = renderables.filter(r => r.collection === 'features') || [];

    return features.map(({ props: { customFields: { url, async, defer } } }) =>
        url ? <script src={url} async={!!async} defer={!!defer} /> : <></>
    );
};

export default ScriptCustomLoader;
