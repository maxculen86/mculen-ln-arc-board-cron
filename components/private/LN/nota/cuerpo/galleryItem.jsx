import React from 'react';

const galleryItem = props => {
    const {
        _id,
        url,
        credits,
        description,
        additional_properties,
        totalGallery
    } = props;
    return (
        <section className="com-slider">
            <article className="cont-figure">
                <a className="figure" href={url}>
                    <picture className="content-pic">
                        <source srcset={url}></source>
                        <img
                            className="lazy loaded"
                            alt="imagen-destacada"
                            data-src=""
                            data-was-processed="true"
                        ></img>
                    </picture>
                </a>
                {credits && (
                    <section className="com-epigrafe">
                        <p className="text">{description.basic}</p>
                        <p className="small">
                            Fuente:{' '}
                            {credits.affiliation.map(fuente => fuente.name)} -
                            Crédito:{' '}
                            {credits.by.map(author =>
                                author.byline
                                    ? `${author.name}, `
                                    : `Pegar API Author, `
                            )}
                        </p>
                    </section>
                )}
                {!credits && (
                    <section className="com-epigrafe">
                        <p className="text">{description.basic}</p>
                        <p className="small">Fuente: LA NACION</p>
                    </section>
                )}
            </article>
            <p className="paginator">
                {additional_properties.galleryOrder + 1} de {totalGallery}
            </p>
        </section>
    );
};

export default galleryItem;
