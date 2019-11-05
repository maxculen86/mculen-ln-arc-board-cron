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
                <h2 className="title">
                    Mesa chica es muy grande, ampliaremos cuando tengamos data
                </h2>
                <span className="source">Fuente: Info</span>
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
                <h2 className="title">
                    Mesa chica es muy grande, ampliaremos cuando tengamos data
                </h2>
                <span className="source">Fuente: Info</span>
            </article>
            <button className="next">Next</button>
        </section>
    );
}
