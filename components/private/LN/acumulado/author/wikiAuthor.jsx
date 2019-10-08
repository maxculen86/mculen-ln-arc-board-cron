// TODO: Chequear si se agregan estas reglas al eslint
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: los siguientes enlaces son para agregar en base

import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import '../../../../../resources/dist/css/ln/base/helpers.css';

const WikiAuthor = ({ name, url, imgSrc, bio, twitter }) => (
    <div className="wiki-autor row">
        <section id="" className="cont-figure-wiki">
            <div href={url} className="figure">
                <picture className="content-pic picture">
                    {imgSrc && (
                        <img src={imgSrc} alt="" className="content-img" />
                    )}
                </picture>
            </div>
        </section>
        <div className="wiki-calc">
            <h1 className="com-title-section-xl">{name}</h1>
            <label>LA NACION</label>
        </div>
        <p className="hlp-mobile-none col-12">
            {bio}
            {twitter && (
                <span>
                    Twitter:&nbsp;
                    <a
                        href={`https://twitter.com/${twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {twitter}
                    </a>
                </span>
            )}
        </p>
    </div>
);

WikiAuthor.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired
};

export default WikiAuthor;
