import React, { Suspense, lazy } from 'react';
import IconSprite from '../../../../../components/features/private-global/common/iconSprite/IconSprite';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const AnimatedIcons = lazy(() => import('./AnimatedLogo'));

export const handleIaToggle = ({
    defaultTab,
    setIaButtonIsClicked,
    callback = () => null
}) => {
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
                      <AnimatedIcons />
                  </Suspense>
              ),
              iaButtonClass: 'p-0'
          };
