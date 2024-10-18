/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { Link } from '@ln/contenidos-ui-link';
import { Tooltip } from '@ln/common-ui-tooltip';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import '../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';

function TrustProject({ tooltipData }) {
    const { deployment, contextPath } = useAppContext();

    return (
        <section className="border border-bottom border-thin border-neutral-light-100 py-24 mb-32">
            <div className="w-100 flex flex-column gap-4">
                <Text className="text-12">
                    Conforme a <strong> los criterios de</strong>
                </Text>
                <div className="w-100 flex jc-between ai-start ai-center_m">
                    <div className="flex flex-column flex-row_m ai-start ai-center_m gap-12 gap-16_m">
                        <Adaptableimage
                            height={32}
                            width={187}
                            src={deployment(
                                `${contextPath}/resources/images/the-trust-project.webp`
                            )}
                            alt="The Trust Project"
                        />
                        {tooltipData?.text && (
                            <div className="inline-flex gap-2">
                                <Text>Tipo de trabajo:</Text>
                                <Tooltip
                                    toggleOn="hover"
                                    position="bottom-center"
                                    className="bg-white shadow-xs w-250 rounded-4 border border-all border-neutral-light-100 border-thin z-2"
                                    content={
                                        <Text className="text-12_130">
                                            {tooltipData?.label}
                                        </Text>
                                    }
                                    disableTrigger={Boolean(
                                        !tooltipData?.label
                                    )}
                                >
                                    <strong className="tooltip-sibling-hover">
                                        {tooltipData?.text?.toLowerCase()}
                                    </strong>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                    <Link
                        href="https://www.lanacion.com.ar/tema/the-trust-project-tid68036/"
                        title="Ir a Proyecto Trust"
                        className="flex flex ai-center gap-4 mt-8 mt-0_m"
                    >
                        <Text className="text-14">Conocé más</Text>
                        <Icon size={16}>
                            <IconSprite name="arrowRight" />
                        </Icon>
                    </Link>
                </div>
            </div>
        </section>
    );
}

TrustProject.propTypes = {
    tooltipData: PropTypes.shape({
        text: PropTypes.func.string,
        label: PropTypes.func.string
    })
};

TrustProject.defaultProps = {
    tooltipData: {
        text: '',
        label: ''
    }
};

export default TrustProject;
