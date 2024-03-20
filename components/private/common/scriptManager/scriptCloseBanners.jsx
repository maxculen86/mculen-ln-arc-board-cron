import React from 'react';
import { useAppContext } from 'fusion:context';

const ScriptCloseBanners = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            async
            id="scriptCloseBanners"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptCloseBanners.min.js`
            )}
        />
    );
};

export default ScriptCloseBanners;
