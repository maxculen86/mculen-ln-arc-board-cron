import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

const image = ({ data }) => {
    console.log('data image *********************', data);
    return (
        <>
            <Media mediaData={data} colNumber={12}>
                {/* TODO: componentizar creditos y epigrafe y llamarlos aca */}
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

image.arcType = 'video';

image.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        list_type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default image;
/* 
export default function image() {
    return (
        <section className="cont-figure">
            <a href="/deportes/probando-breaking-news-nid/" className="figure">
                <picture className="content-pic picture zoom">
                    <source
                        media="(min-width: 64em)"
                        srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/fPfH8mFZiDzpKFkxeE7HELbvSlE=/600x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                        alt=""
                    />
                    <source
                        media="(min-width: 48em)"
                        srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/-Aolf8vHyfnyih9BvkqlmgCYBc8=/520x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                        alt=""
                    />
                    <source
                        media="(min-width: 20em)"
                        srcset="https://lanacionar-la-nacion-ar-prod.cdn.arcpublishing.com/resizer/PCnznfpymUaBD6bUQuSEB8d6KQY=/375x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                        alt=""
                    />
                    <img
                        src="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg"
                        className="content-img"
                        alt=""
                    />
                </picture>
            </a>

            <section className="com-epigrafe">
                <p className="text">Epigrafe de foto</p>
                <p className="small">
                    Fuente: LA NACION - Crédito: Enrique García Medina
                </p>
            </section>
        </section>
    );
} */
