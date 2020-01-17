import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

const video = ({ data }) => {
    console.log('data image *********************', data);
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

video.arcType = 'video';

video.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        list_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default video;
