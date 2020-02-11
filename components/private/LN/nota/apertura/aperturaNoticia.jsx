import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

// TODO: name destacadoEnApertura
const aperturaNoticia = ({ basic }) => {
    const credits = basic.credits.by
        ? basic.credits.by.length > 1
            ? 'Créditos'
            : 'Crédito'
        : '';
    return (
        <>
            <Media mediaData={basic} colNumber={12}>
                {basic && (
                    <section
                        className={
                            basic.caption ||
                            basic.distributor ||
                            basic.credits.by
                                ? 'com-epigrafe'
                                : ''
                        }
                    >
                        {basic.caption && (
                            <p className="text">{basic.caption}</p>
                        )}
                        <p className="small">
                            {basic.distributor && basic.distributor.name !== ''
                                ? `Fuente: ${basic.distributor.name}`
                                : ''}
                            {(basic.distributor &&
                                basic.distributor.name !== '') ||
                            basic.credits.by
                                ? ' - '
                                : ''}
                            {basic.vanity_credits &&
                                basic.vanity_credits.affiliation.length &&
                                (basic.credits
                                    ? basic.vanity_credits.by.map(
                                          (credito, i) => {
                                              return (
                                                  <>
                                                      {i === 0
                                                          ? ` - ${credits}: `
                                                          : ', '}
                                                      {credito.type === 'author'
                                                          ? credito.name
                                                          : credito.referent.id}
                                                  </>
                                              );
                                          }
                                      )
                                    : '')}
                            {basic.credits &&
                                basic.credits.by &&
                                (basic.credits
                                    ? basic.credits.by.map((credito, i) => {
                                          return (
                                              <>
                                                  {i === 0
                                                      ? `${credits}: `
                                                      : ', '}
                                                  {credito.type === 'author'
                                                      ? credito.name
                                                      : credito.referent.id}
                                              </>
                                          );
                                      })
                                    : '')}
                        </p>
                    </section>
                )}
            </Media>
        </>
    );
};

aperturaNoticia.propTypes = {
    basic: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf
    })
};

export default aperturaNoticia;
