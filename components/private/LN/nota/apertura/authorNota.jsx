import React from 'react';
import PropTypes from 'fusion:prop-types';

const AuthorNota = ({ authors }) => {
    console.log('Autor: ', authors);

    const listAuthor = authors.map((authorNota, index) => {
        return (
            <div key={index}>
                <a className={authorNota.type}>{authorNota.name}</a>
                <button className={authorNota.type} onClick={() => {}}>
                    SEGUIR
                </button>
            </div>
        );
    });
    return <h1>{listAuthor}</h1>;
};

AuthorNota.propTypes = {
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired
};

export default AuthorNota;
