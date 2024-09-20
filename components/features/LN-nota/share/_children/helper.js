import React, { Suspense, lazy } from 'react';
import IconSprite from '../../../../../components/features/private-global/common/iconSprite/IconSprite';
import '../../../../../resources/packages/css/@ln/contenidos-ui-animatedicons/index.css';

const AnimatedIcons = lazy(() => import('./AnimatedLogo'));

export const handleIaToggle = ({
    isIaVisible,
    setIsIaVisible,
    setIaButtonIsClicked,
    callback = () => null
}) => {
    const shouldShowIa = !isIaVisible;
    setIsIaVisible(shouldShowIa);
    setIaButtonIsClicked(prev => !prev);
    window.LN.observable.publish('showIa', { show: shouldShowIa });
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
