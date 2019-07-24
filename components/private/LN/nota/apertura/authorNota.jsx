import React from 'react';
import PropTypes from 'fusion:prop-types';
//import './index.css'

const AuthorNota = props => {
    const { author } = props;
    const listAuthor = author.map((authorNota, index) => {
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
    listAuthor: PropTypes.array,
    listAuthor: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string
        })
    )
};

export default AuthorNota;
