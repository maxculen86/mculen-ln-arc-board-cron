import React from 'react';

export default function gallery() {
    return (
        <section className="com-slider">
            <button className="previous">Prev</button>
            <article className="cont-figure">
                <a
                    className="figure"
                    href="/programas/mesa-chica"
                    alt="Ir a Mesa chica"
                    data-event="LinkClick"
                    data-section="LinksOTT"
                >
                    <picture className="content-pic">
                        <source srcset="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg" />
                        <img
                            className="lazy loaded"
                            alt="imagen-destacada"
                            data-src=""
                            data-was-processed="true"
                        />
                    </picture>
                </a>
                <section class="com-epigrafe">
                    <p class="text">Epigrafe de foto</p>
                    <p class="small">
                        Fuente: LA NACION - Crédito: Enrique García Medina
                    </p>
                </section>
            </article>
            <article className="cont-figure">
                <a
                    className="figure"
                    href="/programas/mesa-chica"
                    alt="Ir a Mesa chica"
                    data-event="LinkClick"
                    data-section="LinksOTT"
                >
                    <picture className="content-pic">
                        <source srcset="https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/272ELZPBAJAMTJ6NLZISAQ5S3Q.jpg" />
                        <img
                            className="lazy loaded"
                            alt="imagen-destacada"
                            data-src=""
                            data-was-processed="true"
                        />
                    </picture>
                </a>
                <section class="com-epigrafe">
                    <p class="text">Epigrafe de foto</p>
                    <p class="small">
                        Fuente: LA NACION - Crédito: Enrique García Medina
                    </p>
                </section>
            </article>
            <button className="next">Next</button>
            <label htmlFor="" className="paginator">
                2 de 8
            </label>
        </section>
    );
}
