import React from 'react';

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
}
