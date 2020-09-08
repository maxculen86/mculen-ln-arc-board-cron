import React from 'react';
import PropTypes from 'fusion:prop-types';
// import PropTypes from 'fusion:prop-types';

// import ModDescription from './mod-description';

import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import ComTitle from './com-title';
import ComDate from './com-date';
import get from './utils/get';
import ModBajada from './mod-bajada';
import ModMarquesina from './mod-marquesina';

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
        dateSize,
        hour
    } = props;

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
            {hour && hour}
            {withMedia && media}

            {/* Ir a MODULO DESCRIPTION */}
            <section className="mod-description">
                <ComTitle
                    tag={titleTag || 'h2'}
                    size={titleSize || '--l'}
                    link={link}
                    content={titleText}
                />

                {subheadText && (
                    <ModBajada
                        link={link}
                        subheadSize={subheadSize}
                        subheadText={subheadText}
                    />
                )}

                <ModMarquesina text={authors} link={link} />

                {dateText && <ComDate display_date={dateText} />}
            </section>
        </article>
    );
};

ModArticle.propTypes = {
    dataSection: PropTypes.string,
    classCondition: PropTypes.string,
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    subheadText: PropTypes.string,
    subheadSize: PropTypes.string,
    dateText: PropTypes.string,
    dateSize: PropTypes.string,
    hour: PropTypes.string,
    authors: PropTypes.string,
    withMedia: PropTypes.boolean,
    outputType: PropTypes.string,
    articleData: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired
};

ModArticle.defaultProps = {
    dataSection: undefined,
    classCondition: undefined,
    titleTag: 'h4',
    titleSize: '--s',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    dateSize: undefined,
    authors: '',
    withMedia: false,
    link: undefined,
    hour: undefined,
    outputType: 'default'
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
*/
