import { useState } from 'react';
import { getInitialChainConfig } from '../_helper';

const useChainData = (featureId, renderables) => {
    const chainData = getInitialChainConfig(featureId, renderables);
    const [config, setConfig] = useState(chainData.initialConfig);

    return {
        ...chainData,
        config,
        setConfig
    };
};

export default useChainData;
