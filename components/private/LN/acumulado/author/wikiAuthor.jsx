// TODO: Chequear si se agregan estas reglas al eslint
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: los siguientes enlaces son para agregar en base

// import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
// import '../../../../../resources/dist/css/ln/base/helpers.css';

const WikiAuthor = ({ globalContent }) => {
    const {
        byline,
        bio_page: bioPage,
        image: { url },
        longBio,
        twitter
    } = globalContent;
    return (
        <div className="wiki-autor row">
            <div className="col-12">
                <section id="" className="cont-figure-wiki">
                    <div href={bioPage} className="figure">
                        <picture className="content-pic picture">
                            {url && (
                                <img src={url} alt="" className="content-img" />
                            )}
                        </picture>
                    </div>
                </section>
                <div className="wiki-calc">
                    <ComTitle tag="h1" size="--xl" content={byline} />
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
