import React from 'react';

const galleryItem = props => {
    const { _id, url, subtitle, credits, description } = props;
    return (
        <div key={_id} className="row">
            <div className="col-12">
                <section className="com-slider offset-negative">
                    <article className="cont-figure">
                        <a href={url}>
                            <div>
                                <h5>{subtitle}</h5>
                                <img src={url} />
                            </div>
                        </a>
                        {credits && (
                            <section className="com-epigrafe">
                                <p className="text">{description.basic}</p>
                                <p className="small">
                                    Fuente:{' '}
                                    {credits.affiliation.map(
                                        fuente => fuente.name
                                    )}{' '}
                                    - Crédito:{' '}
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
                </section>
            </div>
        </div>
    );
};

export default galleryItem;
