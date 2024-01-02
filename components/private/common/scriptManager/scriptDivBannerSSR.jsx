import React from 'react';
import { useAppContext } from 'fusion:context';

const ScriptDivBannerSSR = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            id="scriptDivBannerSSR"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptDivBannerSSR.min.js`
            )}
        />
    );
};

export default ScriptDivBannerSSR;
