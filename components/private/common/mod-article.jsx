import React from 'react';
//import PropTypes from 'fusion:prop-types';

import ModDescription from './mod-description';

import '../../../resources/dist/css/ln/modules/mod-article.css';

const ModArticle = props => {
    const {
        classCondition,
        link,
        titleTag,
        titleSize,
        titleText,
        authorSize,
        authorText,
        withMedia,
        subheadText,
        subheadSize,
        dateText,
        dateSize
    } = props;
    return (
        <article className={`mod-article ${classCondition || ''}`}>
            {withMedia ? (
                // Ir a MODULO MEDIA
                <section role="button" className="mod-media">
                    <figure role="button" className="mod-figure">
                        <a href={link} title={titleText}>
                            {/* FOTO */}
                            <picture className="mod-picture ">
                                <img
                                    src="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                    loading="lazy"
                                    className="com-image "
                                    alt={titleText}
                                />
                            </picture>
                            {/* VIDEO o GALERIA */}
                        </a>
                    </figure>
                </section>
            ) : (
                <></>
            )}

            {/* Ir a MODULO DESCRIPTION */}
            <ModDescription
                link={link}
                titleTag={titleTag}
                titleSize={titleSize}
                titleText={titleText}
                subheadText={subheadText}
                subheadSize={subheadSize}
                authorText={authorText}
                authorSize={authorSize}
                dateText={dateText}
                dateSize={dateSize}
            />
        </article>
    );
};

export default ModArticle;
