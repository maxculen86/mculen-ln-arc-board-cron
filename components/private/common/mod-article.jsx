/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from 'react';
import { cx } from '@ln/cva';
import PropTypes from 'prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { useAppContext } from 'fusion:context';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import getMediaData from '../LN/common/utils/modArticleHelper';
import Media from '../LN/common/media';
import get from './utils/get';
import ModDescription from './mod-description';
import { useBookmarkContext } from './bookmark/hooks/BookmarkContext';
import '../../../resources/dist/css/ln/modules/mod-article.css';

const ModArticle = forwardRef((props, ref) => {
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
        titleWeight,
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
        isApertura,
        registerSuccessEvent,
        typeArticle,
        mobileImage,
        searchableField,
        openBarrier
    } = props;

    const { layout: layoutPageBuilder } = useAppContext() || {};

    const { setBookmarkId } = useBookmarkContext();

    const {
        _id,
        website_url: websiteUrl,
        content_restrictions: contentRestrictions,
        bookmarkId
    } = articleData || {};

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

    const marquesina = get(articleData, 'marquesina', null);

    const { mediaData, withMobileImage } = getMediaData(
        videoBackground,
        device,
        mobileImage,
        layout,
        isRenderAuthor,
        isRenderAuthorOpinion,
        articleData
    );

    const isBookmark = typeArticle === 'Bookmark';
    const hasAuthorName =
        (isRenderAuthor && classCondition !== '--columnista') ||
        isRenderAuthorOpinion;
    const dataAuthors = isBookmark && get(articleData, 'credits.by', []);
    const categoryNote = get(articleData, 'category', '');
    const onCLick = event => {
        if (typeof registerSuccessEvent === 'function') {
            registerSuccessEvent();
        }
        if (typeof handleClick === 'function') {
            handleClick(event, websiteUrl);
        }
    };

    const classNameArticle = cx(
        'mod-article',
        { '--no-media': !withMedia },
        { '--author': hasAuthorName },
        { 'w-100-1px contain-layout-style': isApertura },
        classCondition
    );

    // TODO: Reemplazar el elemento <article> por un elemento interactivo semántico (<button> o <a>) cuando sea posible para poder eliminar los comentarios de ESLint.
    return (
        <article
            ref={ref}
            className={classNameArticle}
            {...extraOpts}
            onClick={onCLick}
            onAuxClick={onCLick}
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
                    withMobileImage={withMobileImage}
                    searchableField={searchableField}
                    authors={hasAuthorName && authors}
                />
            )}
            <ModDescription
                link={link}
                titleTag={titleTag}
                titleSize={noMedia || isRenderAuthor ? '--l' : titleSize}
                titleText={titleText}
                titleWeight={titleWeight}
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
                contentRestrictions={contentRestrictions}
                dataAuthors={dataAuthors}
                categoryNote={categoryNote}
                layoutPageBuilder={layoutPageBuilder}
            />

            {isBookmark && (
                <Button
                    onClick={() => {
                        openBarrier();
                        setBookmarkId(bookmarkId);
                    }}
                    title="Quitar de mis notas"
                    variant="primary"
                    size={32}
                    iconOnly
                >
                    <Icon size={16}>
                        <IconSprite name="bookmarkFilled" />
                    </Icon>
                </Button>
            )}
        </article>
    );
});

ModArticle.propTypes = {
    anexo: PropTypes.string,
    authorSize: PropTypes.string,
    articleData: PropTypes.shape({
        _id: PropTypes.string,
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({ _id: PropTypes.string })
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
    registerSuccessEvent: PropTypes.func,
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
    titleWeight: PropTypes.string,
    videoBackground: PropTypes.shape({
        _id: PropTypes.number,
        streams: PropTypes.arrayOf(
            PropTypes.shape({
                height: PropTypes.number,
                stream_type: PropTypes.string,
                url: PropTypes.string,
                width: PropTypes.number
            })
        ),
        type: PropTypes.string
    }),
    withMedia: PropTypes.bool,
    isApertura: PropTypes.bool,
    typeArticle: PropTypes.string,
    mobileImage: PropTypes.shape({
        _id: PropTypes.string,
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({ _id: PropTypes.string })
        })
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    }),
    openBarrier: PropTypes.func.isRequired
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
    registerSuccessEvent: undefined,
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
    titleWeight: undefined,
    tags: undefined,
    videoBackground: undefined,
    withMedia: false,
    isApertura: false,
    typeArticle: '',
    mobileImage: undefined,
    searchableField: undefined
};

export default ModArticle;
