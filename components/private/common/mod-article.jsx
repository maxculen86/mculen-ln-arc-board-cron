import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import get from './utils/get';
import ModDescription from './mod-description';
//para demo front
import ComImage from './com-image';
import ModMedia from './mod-media';
import getAuthorsPhoto from './utils/getAuthorsPhoto';

const ModArticle = props => {
    const {
        frontdemo,
        srcdemo,
        articleData,
        dataSection,
        outputType,
        classCondition,
        link,
        titleTag,
        titleSize,
        titleText,
        marqueeSize,
        authors,
        authorSize,
        isRenderAuthor,
        isRenderAuthorOpinion,
        withMedia,
        subheadText,
        subheadSize,
        dateText,
        dateSize,
        leadText,
        anexo,
        noMedia,
        label,
        artPosition,
        boxPosition,
        hour,
        category,
        tags
    } = props;
    const { _id } = articleData || {};
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    if (boxPosition) {
        extraOpts['data-pos'] = `${boxPosition}${artPosition}`;
        extraOpts['data-id'] = _id;
        extraOpts['data-notaid'] = _id;
        extraOpts['data-source'] = 'editor';
    }
    const imagenDestacada =
        isRenderAuthor || isRenderAuthorOpinion
            ? getAuthorsPhoto(articleData)
            : get(articleData, 'promo_items.basic', null);
    const marquesina = get(articleData, 'marquesina', null);

    const type = get(imagenDestacada, 'type', null);

    return (
        <article
            className={`mod-article ${classCondition || ''} ${
                boxPosition ? `toi${boxPosition}${artPosition} nid${_id}` : ''
            } ${noMedia ? '--no-media' : ''} ${
                isRenderAuthor || isRenderAuthorOpinion ? '--author' : ''
            }`}
            {...extraOpts}
        >
            {hour && hour}

            {withMedia && (
                <Media
                    mediaData={type === 'image' ? imagenDestacada : null}
                    href={link}
                    outputType={outputType}
                    anexo={anexo}
                    // labelArticle="La Chapita solo se tiene que ver con foto o placeholder"
                />
            )}

            {frontdemo && (
                <div>
                    <ModMedia>
                        <figure className="mod-figure">
                            <a href={link}>
                                <picture className="mod-picture">
                                    <ComImage src={srcdemo} />
                                </picture>
                            </a>
                        </figure>
                    </ModMedia>
                </div>
            )}

            <ModDescription
                link={link}
                titleTag={titleTag}
                titleSize={noMedia || isRenderAuthor ? '--m' : titleSize}
                titleText={titleText}
                authors={authors}
                authorSize={isRenderAuthor ? '--twoxs' : authorSize}
                subheadText={subheadText}
                subheadSize={subheadSize}
                dateText={dateText}
                dateSize={dateSize}
                lead={leadText}
                label={label}
                marquesina={marquesina}
                category={category}
                tags={tags}
            />
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
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.boolean]),
    authors: PropTypes.string,
    withMedia: PropTypes.boolean,
    outputType: PropTypes.string,
    articleData: PropTypes.shape({
        _id: PropTypes.string,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired,
    category: PropTypes.string,
    tags: PropTypes.string,
    isRenderAuthor: PropTypes.bool,
    isRenderAuthorOpinion: PropTypes.bool
};

ModArticle.defaultProps = {
    dataSection: undefined,
    classCondition: undefined,
    titleTag: 'h2',
    titleSize: '--xs',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    dateSize: undefined,
    authors: '',
    withMedia: false,
    link: undefined,
    hour: undefined,
    outputType: 'default',
    category: undefined,
    tags: undefined,
    isRenderAuthor: false,
    isRenderAuthorOpinion: false
};

export default ModArticle;
