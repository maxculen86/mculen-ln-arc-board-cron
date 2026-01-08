/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Opening } from '@ln/contenidos-ui-opening';
import { setFilteredRenderables, validateChain } from './common/_helper-WebApi';
import { setCustomFields } from './_helper';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import {
    checkChangeChildrenForPB,
    setWrappedChildren,
    setStaticDynamically
} from '../utils/_helpers';
import { processLayoutItems } from '../utils/processLayoutItems';
import setRender from '../utils/setRender';
import { setQuantityByLayout, LAYOUTS } from '../utils/common/_helpers-WebApi';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';
import useValidateChain from '../../private/LN10/common/hooks/useValidateChain';

const { FOCAL_LEFT, FOCAL_LEFT_VIDEO } = LAYOUTS;

function CajaApertura(props) {
    const {
        id: chainId,
        isAdmin,
        customFields: { layout = '', hideCaja },
        childProps,
        children,
        renderables = []
    } = props;

    const error = useValidateChain({
        isAdmin,
        chainId,
        renderables,
        sectionValidation,
        hideChain: hideCaja,
        nameSection: 'Apertura',
        dataSection: 'apertura',
        callbackValidation: isInOpening =>
            validateChain(childProps, layout, isInOpening)
    });

    const { position, positionInsideSection } = getCommonProps(props);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const features = setFilteredRenderables(renderables, children);
    const featuredChildren = setWrappedChildren(features, children) || [];

    const slicedChildren = processLayoutItems(
        featuredChildren,
        childProps,
        layout,
        layout === FOCAL_LEFT || layout === FOCAL_LEFT_VIDEO
    );

    const [currentChildren, setUpdateChildrens] = useState(slicedChildren);

    useEffect(() => {
        if (isAdmin) {
            checkChangeChildrenForPB({
                features,
                children,
                setUpdateChildrens,
                layout,
                setQuantityByLayout
            });
        }
    }, [children, layout]);

    const { bannerMob = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const Component = setRender({
        chainId,
        viewabilityData,
        isAdmin,
        error,
        hideBox: hideCaja,
        withSection: false,
        extraOptions: {
            default: (
                <>
                    <Opening
                        data-chain-id={chainId}
                        {...viewabilityData}
                        focalType={layout}
                    >
                        {currentChildren}
                    </Opening>
                    {bannerMob}
                </>
            )
        }
    });

    return setStaticDynamically(Component, isAdmin, extraOptsDiv, chainId);
}

CajaApertura.label = 'LN10 Caja Apertura';

CajaApertura.propTypes = {
    id: PropTypes.string,
    isAdmin: PropTypes.bool,
    customFields: setCustomFields()
};

export default Consumer(CajaApertura);
