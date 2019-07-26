import React from 'react';
import PropTypes from 'fusion:prop-types';

const AuthorNota = ({ author }) => {
    const listAuthor = author
        ? author.map(authorNota => {
              return (
                  <div key={author.slug}>
                      <a href={author.slug} className={authorNota.type}>
                          {authorNota.name}
                      </a>
                      <button
                          type="button"
                          className={authorNota.type}
                          onClick={() => {}}
                      >
                          SEGUIR
                      </button>
                  </div>
              );
          })
        : null;
    return <h1>{listAuthor}</h1>;
};

AuthorNota.propTypes = {
    author: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            slug: PropTypes.string
        })
    ).isRequired
};

export default AuthorNota;
