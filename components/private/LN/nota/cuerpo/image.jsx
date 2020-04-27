import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/com-text';

const image = ({ data, withZoom }) => {
    const credits = data.credits.by
        ? data.credits.by.length > 1
            ? 'Créditos'
            : 'Crédito'
        : '';
    const distributors =
        data.distributor && data.distributor.name !== ''
            ? `Fuente: ${
                  data.distributor.name ? data.distributor.name : 'LA NACION'
              }`
            : '';
    const semicolon =
        data.distributor &&
        data.distributor.name !== '' &&
        data.credits.by !== undefined
            ? ' - '
            : '';
    const creditos =
        data.credits &&
        data.credits.by !== undefined &&
        (data.credits
            ? data.credits.by.map((credito, i) => {
                  const semicolonCredits =
                      credito.type === 'author' || credito.type === 'reference'
                          ? ', '
                          : '';
                  const totalCredits = `${i === 0 ? `${credits}: ` : ''}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.type === 'reference'
                          ? credito.referent.id
                          : ''
                  }`;
                  return totalCredits;
              })
            : '');
    const vanityCreditos =
        data.vanity_credits &&
        data.vanity_credits.affiliation.length &&
        (data.credits
            ? data.vanity_credits.by.map((credito, i) => {
                  const totalVanityCredits = `${i === 0 ? `credits: ` : ', '}${
                      credito.type === 'author'
                          ? credito.name
                          : credito.referent.id
                  }`;
                  return totalVanityCredits;
              })
            : '');
    const fuenteCredito = `${distributors}${semicolon}${
        data.credits && data.credits.by ? creditos : ''
    }`;
    return (
        <>
            <Media mediaData={data} withZoom={withZoom} colNumber={12}>
                {data && (
                    <ComFigcaption>
                        {data.caption && (
                            <ComText
                                classCondition="--caption"
                                textname={data.caption}
                            />
                        )}
                        <ComText
                            classCondition="--credit"
                            textname={fuenteCredito}
                        />
                    </ComFigcaption>
                )}
            </Media>
        </>
    );
};

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        distributor: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf,
        type: PropTypes.string.isRequired
    }).isRequired,
    withZoom: PropTypes.string.isRequired
};

export default image;
