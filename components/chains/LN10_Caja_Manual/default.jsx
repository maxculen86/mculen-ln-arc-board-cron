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
import { LAYOUTS, setSlicedChildren } from '../utils/common/_helpers-WebApi';
import getComponent from '../utils/getComponent';
import { reorderArticlesWithTimeline } from '../utils/reorderArticlesWithTimeline';

const { BN_6_GRID_MAS_TIMELINE } = LAYOUTS;

function CajaManual(props) {
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

    const isGrid6MasTimeline = layout === BN_6_GRID_MAS_TIMELINE;

    const { position, positionInsideSection } = getCommonProps(props);

    const error = validateCajaManual(
        layout,
        childProps,
        chainStyle,
        isGrid6MasTimeline
    );

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection
    );

    const articles = setSlicedChildren({
        config: { layout, countTimeline: isGrid6MasTimeline },
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
                        {isGrid6MasTimeline
                            ? reorderArticlesWithTimeline(articles, childProps)
                            : articles}
                    </ContainerCards>
                    {bannerMob}
                </>
            )
        }
    });

    return setStaticDynamically(Component, hasVariants, extraOptsDiv, chainId);
}

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
