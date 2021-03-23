/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import dataLayerScriptDeportes from './dataLayerScriptDeportes';

const dataLayerHome = props => {
    /*
    const { globalContent } = props;
    const { _id } = globalContent || {};
    */
    const dataLayer = dataLayerScriptDeportes();

    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: dataLayer
            }}
        />
    );
};

dataLayerHome.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};

export default dataLayerHome;
