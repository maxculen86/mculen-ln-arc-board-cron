import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComText from './text';
import ComLogo from './com-logo';
import ComLink from './com-link';

import '../../../resources/dist/css/ln/modules/mod-sponsor.css';
import ComContainer from './com-container';
import ModTooltip from './mod-tooltip';

const ModSponsor = props => {
    const { type, sponsor, textName, link, tooltip = {} } = props;

    const dictionaryAlt = {
        hola: 'Revista Hola',
        jardin: 'Revista Jardin',
        brando: 'Revista Brando',
        living: 'Revista Living',
        lugares: 'Revista Lugares',
        rolling: 'Revista Rolling Stone',
        ohlala: 'Revista Ohlalá',
        'hola-blanco': 'Revista Hola',
        'jardin-blanco': 'Revista Jardin',
        'brando-blanco': 'Revista Brando',
        'living-blanco': 'Revista Living',
        'lugares-blanco': 'Revista Lugares',
        'rolling-blanco': 'Revista Rolling Stone',
        'ohlala-blanco': 'Revista Ohlalá'
    };

    return (
        <div className={`mod-sponsor ${type} ${sponsor}`}>
            {sponsor && (
                <ComLink link={link}>
                    <ComLogo
                        logoName={sponsor}
                        size="--sm"
                        alt={dictionaryAlt[sponsor]}
                    />
                </ComLink>
            )}

            <>
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
            </>
        </div>
    );
};

ModSponsor.propTypes = {
    type: PropTypes.string,
    sponsor: PropTypes.string,
    textName: PropTypes.string,
    link: PropTypes.string,
    tooltip: PropTypes.shape({
        text: PropTypes.string,
        label: PropTypes.string
    })
};

ModSponsor.defaultProps = {
    type: undefined,
    sponsor: undefined,
    tooltip: undefined,
    textName: undefined,
    link: undefined
};

export default ModSponsor;
