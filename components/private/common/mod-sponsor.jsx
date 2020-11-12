import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComText from './com-text';
import ComLogo from './com-logo';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/modules/mod-sponsor.css';
import ComContainer from './com-container';
import ModTooltip from './mod-tooltip';

const ModSponsor = props => {
    const { type, sponsor, textName, link, tooltip = {} } = props;
    console.log('tooltip', tooltip);
    // console.log("type", type)
    // console.log("sponsor", sponsor)

    return (
        <div className={`mod-sponsor ${type} ${sponsor}`}>
            {sponsor && (
                <ComLink link={link}>
                    <ComLogo color="true" logoName={sponsor} size="--xs" />
                </ComLink>
            )}

            <>
                {type === '--contentlab' ? (
                    <ComText tag="" size="--threexs" classCondition="--sponsor">
                        ContentLAB para {textName}
                        {tooltip.label && (
                            <span className="com-text --tooltip">
                                <ComContainer>
                                    <ModTooltip label={tooltip.label} />
                                </ComContainer>
                            </span>
                        )}
                    </ComText>
                ) : (
                    <ComText tag="" size="--threexs" classCondition="--sponsor">
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
            </>
        </div>
    );
};

ModSponsor.propTypes = {
    type: PropTypes.string,
    sponsor: PropTypes.string,
    textName: PropTypes.string,
    link: PropTypes.string
};

export default ModSponsor;
