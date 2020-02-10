import React, { useEffect } from 'react';

const Author = ({ authors }) => {
    return (
        <article className="mod-caja-autorAcu" key={authors._id}>
            <a
                href={`/autor/${authors.slug}/?_website=la-nacion-ar`}
                title={`${authors.byline}`}
            >
                <h3 className="com-title-section-autor hlp-marginBottom-10">
                    {`${authors.byline}`}
                </h3>
                <p>
                    {typeof authors.role === 'string' && authors.role
                        ? authors.role.toUpperCase()
                        : authors.role}
                </p>

                <figure className="mod-caja-autorAcu__figure">
                    {authors.image.url && (
                        <img
                            src={authors.image.url}
                            alt={`${authors.byline}`}
                        />
                    )}
                </figure>

                <span className="--btn --secondary --small">
                    TODAS LAS NOTAS
                </span>
            </a>
        </article>
    );
};

export default Author;
