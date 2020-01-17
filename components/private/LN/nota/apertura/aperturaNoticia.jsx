import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

// TODO: name destacadoEnApertura
const aperturaNoticia = ({ basic }) => {
    return (
        <>
            <Media mediaData={basic} colNumber={12}>
                {/* TODO: componentizar creditos y epigrafe y llamarlos aca */}
                <section className="com-epigrafe">
                    <p className="text">{basic.caption}</p>
                    <p className="small">
                        Fuente:{' '}
                        {basic.credits.affiliation.map(fuente => (
                            <>{fuente.name}</>
                        ))}{' '}
                        - Crédito:{' '}
                        {basic.credits.by.map(credito => (
                            <>{credito.name}</>
                        ))}
                    </p>
                </section>
            </Media>
        </>
    );
};

aperturaNoticia.propTypes = {
    basic: PropTypes.shape({
        caption: PropTypes.string,
        credits: PropTypes.string
    })
};

export default aperturaNoticia;
