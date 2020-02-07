import React, { useEffect, useRef } from 'react';
import Proptypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';

import '../../../../../resources/dist/css/ln/components/author.css';
import '../../../../../resources/dist/css/ln/modules/caja-autoracu.css';
import '../../../../../resources/dist/css/ln/components/title.css';

const Article = ({ authors }) => (
    <article className="mod-caja-autorAcu">
        <a
            href={`/autor/${authors.authors[0].slug}/?_website=la-nacion-ar`}
            title={`${authors.authors[0].byline}`}
        >
            <h3 className="com-title-section-autor hlp-marginBottom-10">
                {`${authors.authors[0].byline}`}
            </h3>
            <p>
                {typeof authors.authors[0].role === 'string' &&
                authors.authors[0].role
                    ? authors.authors[0].role.toUpperCase()
                    : authors.authors[0].role}
            </p>

            <figure className="mod-caja-autorAcu__figure">
                {authors.authors[0].image && (
                    <img
                        src={authors.authors[0].image}
                        alt={`${authors.authors[0].byline}`}
                    />
                )}
            </figure>

            <span className="--btn --secondary --small">TODAS LAS NOTAS</span>
        </a>
    </article>
);

const CajaAutor = props => {
    const savedCallback = useRef();

    if (props.customFields && props.customFields.author) {
        savedCallback.current = props.customFields.author;
    }

    useEffect(() => {
        if (props.customFields.author && props.customFields.author.length > 0) {
            savedCallback.current = props.customFields.author;
        }
    }, [props.customFields.author]);

    const content = useContent(
        {
            source: 'authorSourceColumnist',
            query: { byline: savedCallback.current }
        },
        [savedCallback.current]
    );
    if (content && content.authors && content.authors.length > 0) {
        return <Article authors={content} />;
    }
    return null;
};

export default CajaAutor;
