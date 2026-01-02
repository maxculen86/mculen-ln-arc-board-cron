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
import { LAYOUTS } from '../utils/common/_helpers-WebApi';
import getComponent from '../utils/getComponent';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import { processLayoutItems } from '../utils/processLayoutItems';

import '../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import '../../../resources/packages/css/@ln/common-ui-grid/index.css';

const {
    BN_6_GRID_MAS_TIMELINE,
    BN_PLAYER_1_MAS_3,
    BN_PLAYER_1_MAS_4,
    BN_PLAYER_HORIZONTAL
} = LAYOUTS;

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
    const isBnPlayer = [
        BN_PLAYER_1_MAS_3,
        BN_PLAYER_1_MAS_4,
        BN_PLAYER_HORIZONTAL
    ].includes(layout);

    const { position, positionInsideSection } = getCommonProps(props);

    const error = validateCajaManual({
        layout,
        childProps,
        chainStyle,
        isGrid6MasTimeline,
        isBnPlayer
    });

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        layout,
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
    );

    const articles = processLayoutItems(
        children,
        childProps,
        layout,
        isGrid6MasTimeline
    );

    const hasVariants = checkVariants({ children, renderables });

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        chainStyle,
        isManual: true,
        isStatic: !hasVariants,
        shouldLoadRoof: !hideCaja
    });

    const { bannerMob = undefined, bannerDsk = undefined } =
        getDynamicBanners({
            renderables,
            featureId: chainId
        }) || {};

    const ContainerCards = getComponent(chainStyle, layout);

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
