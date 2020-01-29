import React from 'react';
import Proptypes from 'fusion:prop-types';

const ArticleAcum = props => {
    const { authors } = props;
    let articlesComponents = [];
    if (authors && authors.length) {
        articlesComponents = authors.map((items, id) => {
            return (
                <article className="mod-caja-autorAcu" key={id}>
                    <a
                        href={`${items.bio_page}?_website=la-nacion-ar`}
                        title={`${items.firstName} ${items.lastName}`}
                    >
                        <h3 className="com-title-section-autor hlp-marginBottom-10">
                            {items.firstName ? items.firstName : ''}
                            {items.lastName}
                        </h3>
                        <p>{items.author_type}</p>

                        <figure className="mod-caja-autorAcu__figure">
                            {items.image && (
                                <img
                                    src={items.image}
                                    alt={`${items.firstName} ${items.lastName}`}
                                />
                            )}
                        </figure>

                        <span className="--btn --secondary --small">
                            TODAS LAS NOTAS
                        </span>
                    </a>
                </article>
            );
        });
    }

    return articlesComponents;
};

ArticleAcum.propType = {
    authors: Proptypes.arrayOf(Proptypes.obect)
};

export default ArticleAcum;
