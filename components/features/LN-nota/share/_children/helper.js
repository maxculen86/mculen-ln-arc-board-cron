import React, { Suspense, lazy } from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const AnimatedIconsLazy = lazy(() => import('./AnimatedLogo'));

export const handleIaToggle = ({
    defaultTab,
    setIaButtonIsClicked,
    callback = () => null
}) => {
    const handleIaClosed = data => data.closed && setIaButtonIsClicked(false);
    window.LN.observable.subscribe('iaClosed', handleIaClosed);
    window.LN.observable.publish('showIa', { show: true });
    addEventToDataLayerV2({
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label: defaultTab
    });
    setIaButtonIsClicked(prev => !prev);
    localStorage.setItem('IA-feature-tracking', 'wasDisplayed');
    callback?.();

    return () => {
        window.LN.observable.unsubscribe('iaClosed', handleIaClosed);
    };
};

export const IA_FEATURE_TRACKING_STORAGE = {
    key: 'IA-feature-tracking',
    value: 'wasDisplayed'
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
