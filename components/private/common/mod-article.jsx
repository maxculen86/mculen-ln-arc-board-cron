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
import setArticleClassName from './utils/setArticleClassName';

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
        handleClick,
        layout,
        isApertura
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
        if (
            videoBackground &&
            (layout === 'grillaVideo1' || device !== 'mobile')
        )
            return videoBackground;
        return type === 'image' ? imagenDestacada : null;
    })();

    const onCLick = event => {
        typeof handleClick == 'function' && handleClick(event, websiteUrl);
    };

    return (
        <article
            className={setArticleClassName({
                classCondition,
                boxPosition,
                artPosition,
                _id,
                noMedia,
                isRenderAuthor,
                isRenderAuthorOpinion
            })}
            {...extraOpts}
            onClick={onCLick}
        >
            {hour}

            {withMedia && (
                <Media
                    mediaData={mediaData}
                    href={link}
                    outputType={outputType}
                    html={anexo}
                    titleText={titleText}
                    isPowa={isPowa}
                    isApertura={isApertura}
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
    anexo: PropTypes.string,
    authorSize: PropTypes.string,
    articleData: PropTypes.shape({
        _id: PropTypes.string,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired,
    artPosition: PropTypes.string,
    authors: PropTypes.string,
    boxPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    category: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    classCondition: PropTypes.string,
    dataSection: PropTypes.string,
    dateSize: PropTypes.string,
    dateText: PropTypes.string,
    device: PropTypes.string,
    handleClick: PropTypes.func,
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isPowa: PropTypes.bool,
    isRenderAuthor: PropTypes.bool,
    isRenderAuthorOpinion: PropTypes.bool,
    label: PropTypes.shape({
        text: PropTypes.string,
        style: PropTypes.string
    }),
    layout: PropTypes.string,
    leadText: PropTypes.string,
    link: PropTypes.string,
    noMedia: PropTypes.string,
    outputType: PropTypes.string,
    subheadSize: PropTypes.string,
    subheadTag: PropTypes.string,
    subheadText: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tags: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    titleSize: PropTypes.string,
    titleTag: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    videoBackground: PropTypes.shape({
        _id: PropTypes.number,
        streams: PropTypes.array,
        type: PropTypes.string
    }),
    withMedia: PropTypes.bool,
    isApertura: PropTypes.bool
};

ModArticle.defaultProps = {
    anexo: undefined,
    authorSize: undefined,
    authors: '',
    artPosition: undefined,
    boxPosition: undefined,
    category: undefined,
    classCondition: undefined,
    dataSection: undefined,
    dateSize: undefined,
    dateText: undefined,
    device: 'desktop',
    handleClick: undefined,
    hour: undefined,
    isRenderAuthor: false,
    isRenderAuthorOpinion: false,
    isPowa: true,
    label: undefined,
    layout: '',
    leadText: undefined,
    link: undefined,
    noMedia: undefined,
    outputType: 'default',
    subheadText: false,
    subheadSize: undefined,
    subheadTag: undefined,
    titleSize: undefined,
    titleTag: undefined,
    tags: undefined,
    videoBackground: undefined,
    withMedia: false,
    isApertura: false
};

export default ModArticle;
