import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

function dataLayerAcumulado(props) {
    const { globalContent } = props;
    const { _id } = globalContent || {};
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            async
            id="scriptDataLayerAcumulado"
            type="text/javascript"
            data-section={_id}
            src={deployment(
                `${contextPath}/resources/js/LN/scriptDataLayerAcumulado.min.js`
            )}
        />
    );
}

dataLayerAcumulado.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};

export default dataLayerAcumulado;
