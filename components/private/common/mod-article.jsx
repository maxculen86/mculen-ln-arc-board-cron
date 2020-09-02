import React from 'react';
// import PropTypes from 'fusion:prop-types';

import ModDescription from './mod-description';

import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import ComTitle from './com-title';
import ModFirma from './mod-firma';
import ComDate from './com-date';
import get from './utils/get';
import ModBajada from './mod-bajada';

const ModArticle = props => {
    const {
        articleData,
        dataSection,
        outputType,
        classCondition,
        link,
        titleTag,
        titleSize,
        titleText,
        authors,
        withMedia,
        subheadText,
        subheadSize,
        dateText,
        dateSize
    } = props;

    // const volanta = label && label.volanta && label.volanta.text;
    // const borderClass = border ? '--border ' : '';
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    const imagenDestacada = get(articleData, 'promo_items.basic', null);
    const type = get(imagenDestacada, 'type', null);
    let media = null;
    media = (
        <Media
            mediaData={type === 'image' ? imagenDestacada : null}
            href={link}
            outputType={outputType}
        />
    );

    return (
        <article
            className={`mod-article ${classCondition || ''}`}
            {...extraOpts}
        >
            {withMedia && media}

            {/* Ir a MODULO DESCRIPTION */}
            <section className="mod-description">
                <ComTitle
                    tag={titleTag || 'h2'}
                    size={titleSize || '--l'}
                    link={link}
                    content={titleText}
                />

                <ModBajada
                    link={link}
                    subheadSize={subheadSize}
                    subheadText={subheadText}
                />

                <ModFirma autor={authors} />

                <ComDate display_date={dateText} />
            </section>
            {/*
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
            */}
        </article>
    );
};

export default ModArticle;
/*
<section role="button" className="mod-media">
    <figure role="button" className="mod-figure">
        <a href={link} title={titleText}>
            {/* FOTO 
            <picture className="mod-picture ">
                <img
                    src="http://demo-prod.origin.arcpublishing.com/resizer/r-JvqZANSLMk42Z4TpYGOtv78eI=/768x0/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/OTEM63R4KFHPDGQSI5C7TAW4JU.jpg"
                    loading="lazy"
                    className="com-image "
                    alt={titleText}
                />
            </picture>
            {/* VIDEO o GALERIA 
        </a>
    </figure>
            </section>
*/
