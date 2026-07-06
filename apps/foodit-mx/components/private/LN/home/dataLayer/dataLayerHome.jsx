import React from 'react';
import { useAppContext } from 'fusion:context';

const dataLayerHome = props => {
    const { globalContent } = props;
    const { _id } = globalContent || {};
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            async
            id="scriptDataLayerHome"
            type="text/javascript"
            data-section={_id}
            src={deployment(
                `${contextPath}/resources/js/LN/scriptDataLayerHome.min.js`
            )}
        />
    );
};

export default dataLayerHome;
