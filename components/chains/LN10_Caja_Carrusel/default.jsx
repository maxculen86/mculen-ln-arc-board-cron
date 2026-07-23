import React, { useEffect, useRef, useMemo } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { validateCarruselChildren } from '../utils/validateCarruselChildren';
import { useRoofData } from '../utils/_helpers';
import setCarouselCustomfields from '../utils/setCarouselCustomfields';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import CajaCarruselProvider from './components/cajaCarruselContext';
import MediaScrollerContainer from './components/mediaScroller/mediaScroller';
import MediaScrollerExpandedWrapper from './components/mediaScrollerExpanded/wrapper';
import MediaScrollerExpanded from './components/mediaScrollerExpanded/mediaScrollerExpanded';
import { shouldHideCarrusel, transformNodes } from './components/helpers';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../private/LN/common/utils/cajaTemasHelper';
import getViewabilityRoof from '../utils/getViewabilityRoof';
import hideParentNode from '../../features/private-global/common/utils/hideParentNode';
import '../../../resources/packages/css/@ln/common-ui-mediascroller/index.css';
import MediaScroller from '../../features/ui/ln/mediaScroller/default';

function CajaCarrusel(props) {
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

    const allowedChildren = ['LN-10/itemCarrusel', 'LN-common/bannerRefactor'];

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
        'carrusel',
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
        allowedChildren
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

    useEffect(() => {
        if (!isAdmin) {
            hideParentNode(divRefInCarrusel, 'DIV');
        }
    }, [divRefInCarrusel?.current]);

    const normalizedLayout = useMemo(() => {
        if (isHome) return 'home';
        return 'acu';
    }, [isHome]);

    const nodes = useMemo(
        () =>
            transformNodes({
                children,
                isAdmin,
                childProps,
                bannerRef: divRefInCarrusel,
                layoutType: normalizedLayout
            }),
        [children, isAdmin, childProps, normalizedLayout]
    );

    const nodesByExpanded = useMemo(
        () =>
            transformNodes({
                children,
                isAdmin,
                childProps,
                isExpanded: true,
                layoutType: normalizedLayout,
                roofData
            }),
        [children, isAdmin, childProps, normalizedLayout, roofData]
    );

    if (hasError) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    if (hide) {
        return null;
    }

    return (
        <CajaCarruselProvider>
            <MediaScrollerExpandedWrapper>
                <MediaScrollerExpanded
                    listVideoData={nodesByExpanded}
                    variant="vertical"
                />
            </MediaScrollerExpandedWrapper>
            <div {...extraOptsDiv}>
                <section {...viewabilityData} data-chain-id={chainId}>
                    <MediaScrollerContainer roofData={roofData}>
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
                </section>
            </div>
        </CajaCarruselProvider>
    );
}

CajaCarrusel.label = 'LN10 Caja Carrusel';

CajaCarrusel.lazy = true;

CajaCarrusel.propTypes = {
    children: PropTypes.isRequired,
    childProps: PropTypes.isRequired,
    customFields: setCarouselCustomfields().isRequired,
    chainId: PropTypes.string.isRequired,
    renderables: PropTypes.array.isRequired,
    siteProperties: PropTypes.shape({
        layoutsName: PropTypes.shape({
            Home: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(CajaCarrusel);
