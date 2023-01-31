/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { Opening } from '@ln/contenidos-ui-opening';

import {
    setFilteredRenderables,
    setWrappedChildren,
    validateChain,
    setSlicedChildren,
    setQuantityByLayout,
    setCustomFields,
    setRender
} from './_helper';

import getChildrenBySection from '../../private/LN/common/utils/LN10/getChildrenBySection';
import checkChildInSection from '../../private/LN/common/utils/LN10/checkChildBySection';

import '../../../resources/packages/css/@ln/contenidos-ui-opening/index.css';
import '../../../resources/dist/css/ln/components/timeline.css';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';

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
    const orderFeaturesInitial = features.map(feature => {
        return feature.props && feature.props.id;
    });
    const orderChildrenInitial = children.map(child => {
        return child.key;
    });
    const slicedChildrenInitial = setSlicedChildren({
        setQuantityByLayout,
        featuredChildren,
        config: { layout, countTimeline: true }
    });
    const [slicedChildren, setUpdateChildrens] = useState(
        slicedChildrenInitial
    );

    useEffect(() => {
        const isEqualOrder =
            JSON.stringify(orderChildrenInitial) ===
            JSON.stringify(orderFeaturesInitial);
        if (!isEqualOrder && isAdmin) {
            const featuresUpdated = children.map(child => {
                return features[
                    features.findIndex(
                        feature =>
                            feature &&
                            feature.props &&
                            feature.props.id === child.key
                    )
                ];
            });
            const featuredChildrenUpdated =
                setWrappedChildren(featuresUpdated, children) || [];
            const slicedChildrenUpdated = setSlicedChildren({
                setQuantityByLayout,
                featuredChildren: featuredChildrenUpdated,
                config: { layout, countTimeline: true }
            });
            setUpdateChildrens(slicedChildrenUpdated);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);

    const Component = (
        <Opening data-chain-id={chainId} {...extraOpts} focalType={layout}>
            {slicedChildren}
        </Opening>
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
