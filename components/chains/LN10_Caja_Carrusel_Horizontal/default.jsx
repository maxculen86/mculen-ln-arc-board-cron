import React, { useRef, useEffect } from 'react';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import { useRoofData } from '../utils/_helpers';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';
import {
    shouldHideCarrusel,
    transformNodes
} from '../LN10_Caja_Carrusel/components/helpers';
import setCarouselCustomfields from '../utils/setCarouselCustomfields';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import hideParentNode from '../../features/private-global/common/utils/hideParentNode';
import CajaCarruselProvider from '../LN10_Caja_Carrusel/components/cajaCarruselContext';
import MediaScrollerContainer from '../LN10_Caja_Carrusel/components/mediaScroller/mediaScroller';
import MediaScrollerExpandedWrapper from '../LN10_Caja_Carrusel/components/mediaScrollerExpanded/wrapper';
import MediaScroller from '../../features/ui/ln/mediaScroller/default';
import MediaScrollerExpanded from '../LN10_Caja_Carrusel/components/mediaScrollerExpanded/mediaScrollerExpanded';

function CajaCarruselHorizontal(props) {
    const {
        siteProperties: { layoutsName = {} },
        layout,
        children,
        customFields: {
            hideCarousel,
            enabledDays = [],
            shouldSchedule = false,
            ...propsForRoof
        },
        childProps = [],
        chainId,
        renderables
    } = props;

    const isHome = layout === layoutsName.HomeLN10;

    const allowedChildren = ['LN-10/itemCarruselHorizontal'];

    const divRefInCarrusel = useRef(null);

    const { isAdmin } = useAppContext();

    const { position, positionInsideSection } = getCommonProps(props);

    const viewabilityRoof = getViewabilityRoof(
        chainId,
        renderables,
        propsForRoof
    );

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        '',
        'carrusel-horizontal',
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
    );

    const error = validateCarruselChildren({
        children,
        childProps,
        allowedChildren,
        isHorizontal: true
    });

    const { error: hasError, hide } = shouldHideCarrusel({
        isAdmin,
        error,
        isHome,
        hideCarousel,
        enabledDays,
        shouldSchedule
    });

    const roofData = useRoofData({
        ...propsForRoof,
        isAdmin,
        isStatic: false,
        shouldLoadRoof: !hide,
        enabledDays,
        shouldSchedule
    });

    if (hasError) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    if (hide) {
        return null;
    }

    useEffect(() => {
        if (!isAdmin) {
            hideParentNode(divRefInCarrusel, 'DIV');
        }
    }, divRefInCarrusel?.current);

    const nodes = transformNodes({
        children,
        isAdmin,
        childProps,
        bannerRef: divRefInCarrusel,
        roofData
    });

    return (
        <CajaCarruselProvider>
            <div {...extraOptsDiv}>
                <section {...viewabilityData} data-chain-id={chainId}>
                    <MediaScrollerContainer
                        roofData={roofData}
                        responsive={{
                            base: { gap: '16px', width: '285px' },
                            md: { gap: '16px', width: '575px' }
                        }}
                        elementsToScroll={1}
                    >
                        {nodes.map(child => (
                            <MediaScroller.Item key={child.key}>
                                {child.isBanner ? (
                                    <div ref={divRefInCarrusel} />
                                ) : (
                                    child.node
                                )}
                            </MediaScroller.Item>
                        ))}
                    </MediaScrollerContainer>

                    <MediaScrollerExpandedWrapper>
                        <MediaScrollerExpanded
                            variant="horizontal"
                            listVideoData={nodes}
                        />
                    </MediaScrollerExpandedWrapper>
                </section>
            </div>
        </CajaCarruselProvider>
    );
}

CajaCarruselHorizontal.label = 'LN10 Caja Carrusel Horizontal';

CajaCarruselHorizontal.lazy = true;

CajaCarruselHorizontal.propTypes = {
    customFields: setCarouselCustomfields().isRequired
};

export default Consumer(CajaCarruselHorizontal);
