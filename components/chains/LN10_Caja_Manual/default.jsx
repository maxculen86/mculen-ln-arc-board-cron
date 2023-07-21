/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import validateCajaManual from './common/_helper-WebApi';
import getGridType from '../utils/getGridType';
import setRender from '../utils/setRender';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import getDynamicBanners from '../../private/common/banners/dynamicBanners/getDynamicBanners';

import BuildRoof from '../utils/_BuildRoof/default';
import {
    useRoofData,
    checkVariants,
    setStaticDynamically
} from '../utils/_helpers';
import { setSlicedChildren } from '../utils/common/_helpers-WebApi';
import getComponent from '../utils/getComponent';

const CajaManual = props => {
    const {
        id: chainId,
        isAdmin,
        customFields,
        childProps,
        children,
        renderables = []
    } = props;

    const {
        layout = '',
        hideCaja,
        website,
        chainStyle,
        ...propsForRoof
    } = customFields;

    const { position, positionInsideSection } = getCommonProps(props);

    const error = validateCajaManual(layout, childProps);

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const articles = setSlicedChildren({
        config: { layout },
        children
    });

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        chainStyle,
        isManual: true
    });

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const ContainerCards = getComponent(chainStyle, layout);
    const hasVariants = checkVariants({ children, renderables });

    const Component = setRender({
        chainId,
        viewabilityData,
        isAdmin,
        error,
        hideBox: hideCaja,
        extraOptions: {
            default: (
                <>
                    {bannerDsk}
                    <BuildRoof {...roofData} isAFondo={layout === 'bnFondo'} />
                    <ContainerCards
                        gridType={getGridType(layout)}
                        gridStyle={chainStyle}
                    >
                        {articles}
                    </ContainerCards>
                    {bannerMob}
                </>
            )
        }
    });

    return setStaticDynamically(Component, hasVariants, extraOptsDiv);
};

CajaManual.label = 'LN10 Caja Manual';

CajaManual.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        ...setCommonCustomFields('cajaManual')
    }).isRequired
};

CajaManual.defaultProps = {
    outputType: 'default'
};

export default Consumer(CajaManual);
