/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import BuildBody from './_children/_buildBody';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';

const BodyAmp = ({ customFields }) => {
    const { outputType, globalContent = {} } = useAppContext();
    const banners = groupBannerConfig(customFields);

    const renderComponents = BuildBody({
        banners,
        outputType,
        globalContent
    });

    return <>{renderComponents}</>;
};

export default BodyAmp;

BodyAmp.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};
