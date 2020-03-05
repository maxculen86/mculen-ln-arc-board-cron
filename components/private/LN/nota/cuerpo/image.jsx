import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

const image = ({ data }) => {
    const credits = data.credits.by
        ? data.credits.by.length > 1
            ? 'Créditos'
            : 'Crédito'
        : '';
    return (
        <>
            <Media mediaData={data} colNumber={12}>
                {data && (
                    <section
                        className={
                            data.caption || data.distributor || data.credits.by
                                ? 'com-epigrafe'
                                : ''
                        }
                    >
                        {data.caption && <p className="text">{data.caption}</p>}
                        <p className="small">
                            {data.distributor && data.distributor.name !== ''
                                ? `Fuente: ${
                                      data.distributor.name
                                          ? data.distributor.name
                                          : 'LA NACION'
                                  }`
                                : ''}
                            {data.distributor &&
                            data.distributor.name !== '' &&
                            data.credits.by !== undefined
                                ? ' - '
                                : ''}
                            {data.vanity_credits &&
                                data.vanity_credits.affiliation.length &&
                                (data.credits
                                    ? data.vanity_credits.by.map(
                                          (credito, i) => {
                                              return (
                                                  <>
                                                      {i === 0
                                                          ? `credits: `
                                                          : ', '}
                                                      {credito.type === 'author'
                                                          ? credito.name
                                                          : credito.referent.id}
                                                  </>
                                              );
                                          }
                                      )
                                    : '')}
                            {data.credits &&
                                data.credits.by &&
                                (data.credits
                                    ? data.credits.by.map((credito, i) => {
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

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        distributor: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default image;
