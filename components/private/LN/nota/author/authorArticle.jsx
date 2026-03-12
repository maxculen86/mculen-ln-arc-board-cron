import React from 'react';
import '../../../../../resources/dist/css/ln/components/author.css';

const authorArticle = ({
    globalContent: {
        credits: { by }
    }
}) => {
    const concatAuthors = (index, _authors) => {
        if (index < _authors.length - 2) return ', ';
        if (index === _authors.length - 2) return ' y ';
        return '';
    };

    if (!by) return null;
    const authors = by.filter(author => author.type === 'author');
    return (
        <>
            {authors.length > 0 ? <span>Por </span> : ''}
            {authors.map((authorNota, i) => (
                <span key={authorNota._id}>
                    {authorNota.url ? (
                        <a href={authorNota.url}>{authorNota.name}</a>
                    ) : (
                        <span>{authorNota.name}</span>
                    )}
                    {concatAuthors(i, authors)}
                </span>
            ))}
        </>
    );
};

export default authorArticle;
