/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Opening } from '@ln/contenidos-ui-opening';
import { setFilteredRenderables, validateChain } from './common/_helper-WebApi';

import { setCustomFields, setRender } from './_helper';
import getChildrenBySection from '../utils/getChildrenBySection';
import checkChildInSection from '../utils/checkChildBySection';

import '../../../resources/packages/css/@ln/contenidos-ui-opening/index.css';
import '../../../resources/packages/css/@ln/common-ui-grid/index.css';
import '../../../resources/dist/css/ln/components/timeline.css';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import {
    checkChangeChildrenForPB,
    setWrappedChildren
} from '../utils/_helpers';
import {
    setSlicedChildren,
    setQuantityByLayout
} from '../utils/common/_helpers-WebApi';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';

const CajaApertura = props => {
    const {
        id: chainId,
        isAdmin,
        customFields: { layout = '', hideBox },
        childProps,
        children,
        renderables = []
    } = props;

    const openingChildren = getChildrenBySection({
        renderables,
        section: {
            title: 'Apertura',
            validation: sectionValidation
        }
    });

    const { position, positionInsideSection } = getCommonProps(props);

    const { extraOptsDiv, extraOpts } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const isInOpening = checkChildInSection(chainId, openingChildren);
    const error = validateChain(childProps, layout, isInOpening);

    const features = setFilteredRenderables(renderables, children);
    const featuredChildren = setWrappedChildren(features, children) || [];

    const slicedChildrenInitial = setSlicedChildren({
        children: featuredChildren,
        config: { layout, countTimeline: true }
    });

    const [slicedChildren, setUpdateChildrens] = useState(
        slicedChildrenInitial
    );

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const Component = (
        <>
            <Opening data-chain-id={chainId} {...extraOpts} focalType={layout}>
                {slicedChildren}
            </Opening>
            {bannerMob}
            {bannerDsk}
        </>
    );

    return setRender({ isAdmin, error, hideBox, Component, extraOptsDiv });
};

CajaApertura.label = 'LN10 Caja Apertura';

CajaApertura.propTypes = {
    id: PropTypes.string,
    isAdmin: PropTypes.bool,
    customFields: setCustomFields()
};

export default Consumer(CajaApertura);
