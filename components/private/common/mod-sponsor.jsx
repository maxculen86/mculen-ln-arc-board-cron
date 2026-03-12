import React from 'react';

import ComText from './text';
import ComLogo from './com-logo';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/modules/mod-sponsor.css';
import ComContainer from './com-container';
import ModTooltip from './mod-tooltip';
import { dictionaryAlt } from './utils/sectionUtils';

function ModSponsor({
    type,
    sponsor,
    textName,
    link,
    target,
    rel,
    logoName,
    tooltip = {}
}) {
    return (
        <div className={`mod-sponsor ${type} ${sponsor}`}>
            {logoName && (
                <ComLink link={link} target={target} rel={rel}>
                    <ComLogo
                        logoName={sponsor}
                        size="--sm"
                        alt={dictionaryAlt[sponsor]}
                    />
                </ComLink>
            )}

            {type === '--contentlab' ? (
                <ComText size="--threexs" extraClass="com-text --sponsor">
                    Content LAB para {textName}
                    {tooltip.label && (
                        <span className="com-text --tooltip">
                            <ComContainer>
                                <ModTooltip label={tooltip.label} />
                            </ComContainer>
                        </span>
                    )}
                </ComText>
            ) : (
                <ComText size="--threexs" extraClass="com-text --sponsor">
                    Espacio Patrocinado
                    {tooltip.label && (
                        <span className="com-text --tooltip">
                            <ComContainer>
                                <ModTooltip label={tooltip.label} />
                            </ComContainer>
                        </span>
                    )}
                </ComText>
            )}
        </div>
    );
}

export default ModSponsor;
