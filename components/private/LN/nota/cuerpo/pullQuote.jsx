import React from 'react';

export default function pullQuote() {
    return (
        <section className="com-cita autor">
            <section className="cont-figure">
                <a
                    href="/deportes/probando-breaking-news-nid/"
                    className="figure"
                >
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
            </section>
            <section className="cont-cita">
                <h2 className="title-cita">
                    ¨He fallado una y otra vez en mi vida, por eso he conseguido
                    el éxito”
                </h2>
                <div className="cont-firma-autor">
                    {' '}
                    <h3 className="nombre-firma">Michael Jordan | </h3>{' '}
                    <h3 className="especialidad-firma"> Basquet</h3>{' '}
                </div>
                <div className="cont-data-firma">
                    {' '}
                    <h3 className="fecha-firma">Enero 2018 -</h3>{' '}
                    <h3 className="lugar-firma"> Entrevista para LN+</h3>{' '}
                </div>
            </section>
        </section>
    );
}
