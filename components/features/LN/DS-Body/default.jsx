import React from 'react';
import { useAppContext } from 'fusion:context';
import groupBannerConfig from '../../LN-nota/body/_utils/_groupBannerConfig';
import BuildBody from '../../LN-nota/body/_children/_buildBody';
import BaseBodyWrapper from '../../LN-nota/body/_children/BaseBodyWrapper';
import { getBodyConfigForLayout } from './helpers/bodyConfig';
import registerScrollTracking from './helpers/registerScrollTracking';

function DsBody({ customFields = {} }) {
    const { outputType, globalContent = {}, layout } = useAppContext();
    const banners = groupBannerConfig(customFields);
    const { _id, content_elements: contentElements } = globalContent;

    const {
        bodyComponents: finalBodyComponents,
        ruleConditions: finalRuleConditions
    } = getBodyConfigForLayout(layout);

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
                ruleConditions: finalRuleConditions
            })}
        </BaseBodyWrapper>
    );
}

DsBody.label = 'LN-DS-Body';

export default DsBody;
