/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import get from './utils/get';
import ModDescription from './mod-description';
import getAuthorsPhoto from './utils/getAuthorsPhoto';

const ModArticle = props => {
    const {
        isPowa,
        device,
        videoBackground,
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
        subheadTag,
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
        tags,
        handleClick
    } = props;
    const { _id, website_url: websiteUrl } = articleData || {};
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

    const mediaData = (() => {
        if (videoBackground && device === 'desktop') return videoBackground;
        return type === 'image' ? imagenDestacada : null;
    })();

    const onCLick = event => {
        typeof handleClick == 'function' && handleClick(event, websiteUrl);
    };

    return (
        <article
            className={`mod-article ${classCondition || ''} ${
                boxPosition
                    ? `toi${boxPosition.replace(
                          'toi',
                          ''
                      )}${artPosition} nid${_id}`
                    : ''
            } ${noMedia ? '--no-media' : ''} ${
                (isRenderAuthor && classCondition !== '--columnista') ||
                isRenderAuthorOpinion
                    ? '--author'
                    : ''
            }`}
            {...extraOpts}
            onClick={onCLick}
            {...(typeof handleClick == 'function'
                ? { 'aria-hidden': 'true' }
                : {})}
        >
            {hour && hour}

            {withMedia && (
                <Media
                    mediaData={mediaData}
                    href={link}
                    outputType={outputType}
                    html={anexo}
                    titleText={titleText}
                    isPowa={isPowa}
                    // labelArticle="La Chapita solo se tiene que ver con foto o placeholder"
                />
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
                subheadTag={subheadTag}
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
    artPosition: PropTypes.string,
    boxPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    classCondition: PropTypes.string,
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    subheadText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    subheadSize: PropTypes.string,
    subheadTag: PropTypes.string,
    dateText: PropTypes.string,
    dateSize: PropTypes.string,
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authors: PropTypes.string,
    withMedia: PropTypes.bool,
    outputType: PropTypes.string,
    articleData: PropTypes.shape({
        _id: PropTypes.string,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired,
    category: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    isRenderAuthor: PropTypes.bool,
    isRenderAuthorOpinion: PropTypes.bool,
    handleClick: PropTypes.func,
    isPowa: PropTypes.bool,
    videoBackground: PropTypes.shape({
        _id: PropTypes.number,
        streams: PropTypes.array,
        type: PropTypes.string
    }),
    device: PropTypes.string
};

ModArticle.defaultProps = {
    dataSection: undefined,
    artPosition: undefined,
    boxPosition: undefined,
    classCondition: undefined,
    titleTag: 'h2',
    titleSize: '--xs',
    subheadText: false,
    subheadSize: '',
    subheadTag: '',
    dateText: undefined,
    dateSize: undefined,
    authors: '',
    withMedia: false,
    link: undefined,
    hour: undefined,
    outputType: 'default',
    category: undefined,
    tags: undefined,
    handleClick: undefined,
    isRenderAuthor: false,
    isRenderAuthorOpinion: false,
    isPowa: true,
    videoBackground: undefined,
    device: 'desktop'
};

export default ModArticle;
