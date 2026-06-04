import React from 'react';
import { useAppContext } from 'fusion:context';
import BuildBody from '../../LN-nota/body/_children/_buildBody';
import BaseBodyWrapper from '../../LN-nota/body/_children/BaseBodyWrapper';
import { getBodyConfigForLayout } from './helpers/bodyConfig';
import registerScrollTracking from './helpers/registerScrollTracking';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import get from '../../../private/common/utils/get';

function DsBody() {
    const { outputType, globalContent = {}, layout } = useAppContext();
    const { _id, content_elements: contentElements } = globalContent;
    const device = useViewportSize();

    const {
        bodyComponents: finalBodyComponents,
        ruleConditions: finalRuleConditions,
        dynamicBanners
    } = getBodyConfigForLayout(layout);

    const bannersVisibilityLabel = get(
        globalContent,
        'label.mostrar_banners.text',
        null
    );
    const bannersDisabledByEditor =
        typeof bannersVisibilityLabel === 'string' &&
        bannersVisibilityLabel.toLowerCase() === 'no';
    const gatedDynamicBanners =
        bannersDisabledByEditor && dynamicBanners
            ? { ...dynamicBanners, enabled: false }
            : dynamicBanners;

    return (
        <BaseBodyWrapper
            contentElements={contentElements}
            outputType={outputType}
            noteId={_id}
            bodyOrigin="Body DS"
            onRegisterScrollTrigger={registerScrollTracking}
        >
            {BuildBody({
                outputType,
                globalContent,
                bodyComponents: finalBodyComponents,
                ruleConditions: finalRuleConditions,
                dynamicBanners: gatedDynamicBanners,
                currentDevice: device,
                layout
            })}
        </BaseBodyWrapper>
    );
}

DsBody.label = 'LN-DS-Body';

export default DsBody;
