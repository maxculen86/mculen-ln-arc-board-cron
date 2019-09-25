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

const WikiAuthor = ({ name, url, imgSrc, bio, twitter }) => (
    <div className="wiki-autor row">
        <section id="" className="cont-figure-wiki hlp-marginBottom-20">
            <a href={url} className="figure">
                <img src={imgSrc} alt="" className="content-img" />
            </a>
        </section>
        <div className="wiki-calc">
            <h1 className="com-title-section-xl">{name}</h1>
            <label className="">
                LA NACION
            </label>
        </div>
        <p className="hlp-mobile-none col-12">
            {bio}
            <br />
            Twitter:
            <span className="com-link --inline">
                <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
            </span>
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
