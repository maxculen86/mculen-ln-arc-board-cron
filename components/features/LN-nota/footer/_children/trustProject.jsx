import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Tooltip } from '@ln/common-ui-tooltip';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import useTrustProjectData from '../../../../private/common/hooks/useTrustProjectData';

import '../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';

function TrustProject({ isInvalid, tooltipData = { text: '', label: '' } }) {
    if (isInvalid) return null;

    const trustProjectData = useTrustProjectData();

    return (
        <section className="w-100 flex flex-column flex-row_m ai-start ai-center_m gap-4">
            <Link className="flex ai-center gap-8" {...trustProjectData.link}>
                <Text className="white-space-nowrap text-light-800 text-12">
                    Conforme a
                </Text>
                <div className="w-100 flex jc-between ai-start ai-center_m">
                    <div className="flex flex-column flex-row_m ai-start ai-center_m gap-12 gap-16_m">
                        <div className="flex gap-8 ai-center">
                            <Adaptableimage {...trustProjectData.image} />
                            <Icon size={16}>
                                <IconSprite
                                    name="arrowRight"
                                    fill="var(--text-light-800)"
                                />
                            </Icon>
                        </div>
                    </div>
                </div>
            </Link>
            {tooltipData?.text && (
                <div className="inline-flex gap-2 ai-center text-12">
                    <Text className="text-light-800">Tipo de trabajo:</Text>
                    <Tooltip
                        toggleOn="hover"
                        position="bottom-center"
                        className="bg-white shadow-xs w-250 rounded-4 border border-all border-neutral-light-100 border-thin z-1500"
                        content={
                            <Text className="text-12_130">
                                {tooltipData?.label}
                            </Text>
                        }
                        disableTrigger={Boolean(!tooltipData?.label)}
                    >
                        <strong className="tooltip-sibling-hover text-light-800">
                            {tooltipData?.text?.toLowerCase()}
                        </strong>
                    </Tooltip>
                </div>
            )}
        </section>
    );
}

export default TrustProject;
