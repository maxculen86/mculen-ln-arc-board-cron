import React, { Suspense, lazy } from 'react';
import { cva } from '@ln/cva';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import {
    FOTOAL100,
    LIVEBLOG_EDITORIAL,
    VIDEO,
    CARDS
} from '../../../../private/common/utils/subtypes/subtypeHelper';

const AnimatedIconsLazy = lazy(() => import('./AnimatedLogo'));

export const handleOpenIAFeature = ({
    defaultTab,
    iaButtonIsClicked,
    setIaButtonIsClicked,
    suscription,
    openBarrier
}) => {
    if (iaButtonIsClicked) {
        return;
    }

    if (suscription && !iaButtonIsClicked) {
        setIaButtonIsClicked(true);
        window.LN.observable.publish('showIa', { show: true });
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: defaultTab
        });
    } else {
        openBarrier();
    }
};

export const getClassAndIconByClick = iaButtonIsClicked =>
    iaButtonIsClicked
        ? {
              iaLogo: <IconSprite name="ai" fill="#FEFEFE" />,
              iaButtonClass:
                  'border-transparent bg-primary-ai bg-ai-active__hover'
          }
        : {
              iaLogo: (
                  <Suspense
                      fallback={<IconSprite name="ai" default fill="#27D2BE" />}
                  >
                      <AnimatedIconsLazy logo="logo-ai" />
                  </Suspense>
              ),
              iaButtonClass: 'p-0'
          };

export const shareContainerVariant = cva('', {
    variants: {
        sticky: {
            true: 'sticky float-l_l z-101 transition transition-all transition-duration-250 top-73_min1024'
        },
        subtype: {
            video: '-order-1 ratio-auto order-initial_min1024',
            fotoAl100:
                'float-l_l transition transition-all transition-duration-250',
            liveblogEditorial: 'border-transparent py-24_m',
            cards: 'border-transparent mt-8'
        }
    },
    defaultVariants: {
        sticky: true,
        subtype: ''
    }
});

export const layoutBySubtype = {
    [FOTOAL100]: 'fotoAl100',
    [VIDEO]: 'video',
    [LIVEBLOG_EDITORIAL]: 'liveblogEditorial',
    [CARDS]: 'cards'
};

export const subtypesWithHorizontalShare = [VIDEO, LIVEBLOG_EDITORIAL, CARDS];

export const subtypesWithoutSticky = [
    VIDEO,
    LIVEBLOG_EDITORIAL,
    FOTOAL100,
    CARDS
];

export const hasSticky = subtype => !subtypesWithoutSticky.includes(subtype);
