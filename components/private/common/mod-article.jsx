/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from 'react';
import { cx } from '@ln/cva';
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

const ModArticle = forwardRef(
    (
        {
            isPowa = true,
            device = 'desktop',
            videoBackground,
            articleData,
            dataSection,
            outputType = 'default',
            classCondition,
            link,
            titleTag,
            titleSize,
            titleText,
            titleWeight,
            authors = '',
            authorSize,
            isRenderAuthor = false,
            isRenderAuthorOpinion = false,
            withMedia = false,
            subheadText = false,
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
            layout = '',
            isApertura = false,
            registerSuccessEvent,
            typeArticle = '',
            mobileImage,
            searchableField,
            openBarrier
        },
        ref
    ) => {
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
    }
);

export default ModArticle;
