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

const WikiAuthor = props => {
    console.log('PROPS::::', props.globalContent);
    const { byline, bio_page, image, longBio, twitter } = props.globalContent;
    return (
        <div className="wiki-autor row">
            <section id="" className="cont-figure-wiki">
                <div href={bio_page} className="figure">
                    <picture className="content-pic picture">
                        {image && (
                            <img src={image} alt="" className="content-img" />
                        )}
                    </picture>
                </div>
            </section>
            <div className="wiki-calc">
                <h1 className="com-title-section-xl">{byline}</h1>
                <label>LA NACION</label>
            </div>
            <p className="hlp-mobile-none col-12">
                {longBio}
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
};

WikiAuthor.propTypes = {
    globalContent: PropTypes.shape({
        byline: PropTypes.string.isRequired,
        bio_page: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        longBio: PropTypes.string.isRequired,
        twitter: PropTypes.string.isRequired
    }).isRequired
};

export default WikiAuthor;
