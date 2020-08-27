import React from 'react';
//import PropTypes from 'fusion:prop-types';

import ComTitle from './com-title';
import ComDate from './com-date';

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
                <section role="button" className="mod-media">
                    <figure role="button" className="mod-figure">
                        <a href={link} title={titleText}>
                            <picture className="mod-picture ">
                                <source
                                    media="(min-width: 1280px)"
                                    srcset="http://demo-prod.origin.arcpublishing.com/resizer/RdPKpev1vn2EyRi60HhAMTuPxSs=/1280x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                />
                                <source
                                    media="(min-width: 1024px)"
                                    srcset="http://demo-prod.origin.arcpublishing.com/resizer/rK6d4KefYwZDESVtE4mlXom0K0w=/690x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                />
                                <source
                                    media="(min-width: 768px)"
                                    srcset="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                />
                                <source
                                    media="(min-width: 360px)"
                                    srcset="http://demo-prod.origin.arcpublishing.com/resizer/6Ep7oaRvxxguKrcQEoEqnPVHSOE=/350x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                />
                                <source
                                    media="(min-width: 320px)"
                                    srcset="http://demo-prod.origin.arcpublishing.com/resizer/Dsi_3kQH6GVZ0BLFE8Fb3Cqh4U4=/310x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                />
                                <img
                                    src="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                                    loading="lazy"
                                    className="com-image "
                                    alt={titleText}
                                />
                            </picture>
                        </a>
                    </figure>
                </section>
            ) : (
                <></>
            )}
            <section className="mod-description">
                <ComTitle
                    tag={titleTag || 'h2'}
                    size={titleSize || '--l'}
                    link={link}
                    content={titleText}
                />
                {subheadText ? (
                    <p className={`com-subhead ${subheadSize || '--threexs'}`}>
                        <a href={link} className="com-link" title={subheadText}>
                            {subheadText}
                        </a>
                    </p>
                ) : (
                    <></>
                )}
                {authorText ? (
                    <>
                        <strong
                            className={`mod-firma ${authorSize || '--fivexs'}`}
                        >
                            <a href={link} title={authorText}>
                                {authorText}
                            </a>
                        </strong>
                    </>
                ) : (
                    <></>
                )}
                {dateText ? (
                    <>
                        <ComDate display_date={dateText} />
                        {/* <time className={`com-date ${dateSize || '--threexs'}`}>
                        {dateText}
                    </time> */}
                    </>
                ) : (
                    <></>
                )}
            </section>
        </article>
    );
};

export default ModArticle;
