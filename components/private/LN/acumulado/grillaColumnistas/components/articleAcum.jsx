import React from 'react';
import Proptypes from 'fusion:prop-types';

const ArticleAcum = props => {
    const { authors } = props;
    let articlesComponents = [];
    if (authors && authors.length) {
        articlesComponents = authors.map(
            ({ bio_page, firstName, lastName, role, image }, id) => {
                return (
                    <article className="mod-caja-autorAcu" key={id}>
                        <a
                            href={`${bio_page}?_website=la-nacion-ar`}
                            title={`${firstName} ${lastName}`}
                        >
                            <h3 className="com-title-section-autor hlp-marginBottom-10">
                                {`${firstName} ${lastName}`}
                            </h3>
                            <p>
                                {typeof role === 'string' && role
                                    ? role.toUpperCase()
                                    : role}
                            </p>

                            <figure className="mod-caja-autorAcu__figure">
                                {image && (
                                    <img
                                        src={image}
                                        alt={`${firstName} ${lastName}`}
                                    />
                                )}
                            </figure>

                            <span className="--btn --secondary --small">
                                TODAS LAS NOTAS
                            </span>
                        </a>
                    </article>
                );
            }
        );
    }

    return articlesComponents;
};

ArticleAcum.propType = {
    authors: Proptypes.arrayOf(Proptypes.obect)
};

export default ArticleAcum;
