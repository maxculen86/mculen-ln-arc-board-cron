import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import groupBannerConfig from '../../LN-nota/body/_utils/_groupBannerConfig';
import BuildBody from '../../LN-nota/body/_children/_buildBody';
import BaseBodyWrapper from '../../LN-nota/body/_children/BaseBodyWrapper';
import { getBodyConfigForLayout } from './helpers/bodyConfig';
import registerScrollTracking from './helpers/registerScrollTracking';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import { queueGoogletagCommand } from '../../../private/LN/common/utils/bannerHelper';

function DsBody({ customFields = {} }) {
    const { outputType, globalContent = {}, layout } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, content_elements: contentElements } = globalContent;
    const device = useViewportSize();

    const {
        bodyComponents: finalBodyComponents,
        ruleConditions: finalRuleConditions,
        dynamicBanners
    } = getBodyConfigForLayout(layout);

    const googleTagConfigs = [];
    useEffect(() => {
        if (googleTagConfigs.length > 0) {
            queueGoogletagCommand(googleTagConfigs);
        }
    }, [device]);

    return (
        <BaseBodyWrapper
            contentElements={contentElements}
            outputType={outputType}
            noteId={_id}
            bodyOrigin="Body DS"
            onRegisterScrollTrigger={registerScrollTracking}
        >
            {BuildBody({
                banners,
                outputType,
                globalContent,
                bodyComponents: finalBodyComponents,
                ruleConditions: finalRuleConditions,
                dynamicBanners,
                currentDevice: device,
                onDynamicBannersGoogletagConfig: config => {
                    if (config) googleTagConfigs.push(config);
                }
            })}
        </BaseBodyWrapper>
    );
}

DsBody.label = 'LN-DS-Body';

export default DsBody;
