import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';

// TODO: name destacadoEnApertura
const aperturaNoticia = ({ basic }) => {
    let credits = basic.credits.by ? 'Crédito' : '';
    credits =
        basic.credits.by && basic.credits.by.length > 1
            ? `${credits}s`
            : credits;
    const distributors =
        basic.distributor && basic.distributor.name !== ''
            ? `Fuente: ${
                  basic.distributor.name ? basic.distributor.name : 'LA NACION'
              }`
            : '';
    const semicolon =
        basic.distributor &&
        basic.distributor.name !== '' &&
        basic.credits.by !== undefined
            ? ' - '
            : '';
    const creditos =
        basic.credits &&
        basic.credits.by &&
        (basic.credits
            ? basic.credits.by.map((credito, i) => {
                  const totalCredits = `${i === 0 ? `${credits}: ` : ''}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalCredits;
              })
            : '');

    /*     const vanityCreditos =
        basic.vanity_credits &&
        basic.vanity_credits.affiliation.length &&
        (basic.credits
            ? basic.vanity_credits.by.map((credito, i) => {
                  const totalVanityCredits = `${i === 0 ? `credits: ` : ', '}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalVanityCredits;
              })
            : ''); */

    const fuenteCredito = `${distributors}${semicolon}${
        basic.credits && basic.credits.by ? creditos : ''
    }`;

    return (
        <Media mediaData={basic} colNumber={12} withZoom="--zoom">
            {basic && (
                <ComFigcaption>
                    {basic.caption && (
                        <ComText
                            classCondition="--caption"
                            textname={basic.caption}
                        />
                    )}
                    <ComText
                        classCondition="--credit"
                        textname={fuenteCredito}
                    />
                </ComFigcaption>
            )}
        </Media>
    );
};

aperturaNoticia.propTypes = {
    basic: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf
    }).isRequired
};

export default aperturaNoticia;
