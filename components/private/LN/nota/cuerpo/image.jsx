import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

const image = ({ data }) => {
    return (
        <>
            <Media mediaData={data} colNumber={12}>
                <section className="com-epigrafe">
                    <p className="text">{data.caption}</p>
                    <p className="small">
                        Fuente:{' '}
                        {data.credits
                            ? data.credits.affiliation.map(fuente => (
                                  <>{fuente.name}</>
                              ))
                            : data.vanity_credits.affiliation.map(fuente => (
                                  <>{fuente.name}</>
                              ))}{' '}
                        - Crédito:{' '}
                        {data.credits
                            ? data.credits.by.map(credito => (
                                  <>{credito.name}</>
                              ))
                            : data.vanity_credits.by.map(credito => (
                                  <>{credito.name}</>
                              ))}
                    </p>
                </section>
            </Media>
        </>
    );
};

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string.isRequired,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default image;
