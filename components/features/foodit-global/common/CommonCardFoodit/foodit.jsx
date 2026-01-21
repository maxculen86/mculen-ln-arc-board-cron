import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Card } from '@ln/foodit-ui-card';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { CardButton } from './components/CardButton';
import { DropdownCard } from './components/DropdownCard';

function CommonCardFoodit({
    articleId,
    linksProps,
    showTime,
    time,
    size,
    variant,
    src,
    alt,
    sources,
    loading,
    fetchPriority,
    tag,
    title,
    customTitle,
    author,
    subtitle,
    label,
    titleEllipsis,
    contentCode,
    fatherType,
    container,
    poster,
    className = '',
    bookmarkAction = null,
    fill = false,
    isOpening = false,
    hasVideo = false,
    mediaVariant = 'image',
    isMyRecipesLayout = false,
    onDelete = null,
    onMove = null
}) {
    const showIconVideo = hasVideo && mediaVariant !== 'video';

    const handleBookmarkClick = e => {
        e.preventDefault();
        e.stopPropagation();

        if (isMyRecipesLayout) {
            return;
        }

        if (bookmarkAction) {
            bookmarkAction();
            return;
        }

        window?.LN?.observable?.publish('openModal', {
            ids: [articleId],
            fatherType
        });
    };

    const buttonProps = {
        'data-id': articleId,
        'data-modal': 'open-modal',
        'data-test-id': `button-bookmark-${articleId}`,
        ...(fatherType && { 'data-father-type': fatherType })
    };

    const cardAction = isMyRecipesLayout ? (
        <DropdownCard
            bookmarkId={articleId}
            onDelete={onDelete}
            onMove={onMove}
        />
    ) : (
        <CardButton
            container={container}
            fill={fill}
            buttonProps={buttonProps}
            handleBookmarkClick={handleBookmarkClick}
        />
    );
    const MAX_LENGTH = 32;
    const shortLabel =
        label.length > MAX_LENGTH ? `${label.slice(0, MAX_LENGTH)}…` : label;

    return (
        <Card
            data-test-id={`${
                isOpening ? 'opening-' : ''
            }card-${variant}-${contentCode}-${articleId}`}
            linkProps={linksProps}
            size={size}
            variant={variant}
            className={className}
            {...(container && { container })}
            style={isMyRecipesLayout ? { overflow: 'visible' } : {}}
        >
            <Card.Top>
                <Card.Media
                    variant={mediaVariant}
                    alt={alt}
                    sources={sources}
                    loading={loading}
                    fetchPriority={fetchPriority}
                    {...(mediaVariant === 'video'
                        ? {
                              dataSrc: src,
                              poster,
                              muted: true,
                              loop: true,
                              playsInline: true,
                              autoPlay: true
                          }
                        : {
                              src
                          })}
                />
                {showIconVideo && <Card.BadgeIcon />}
                {tag && <Card.Badge>{tag}</Card.Badge>}
            </Card.Top>
            <Card.Main
                labelProps={{
                    children: shortLabel,
                    'aria-label': label,
                    title: label,
                    ...(label && { 'data-testid': 'card-label' })
                }}
                title={customTitle || title}
                titleTag={isOpening ? 'h1' : 'h2'}
                subtitle={subtitle}
                titleEllipsis={titleEllipsis}
            >
                <Card.Footer
                    author={author}
                    showTime={Boolean(time) && showTime}
                    time={`${time} min`}
                    icon={<IconSprite name="timer" />}
                    action={cardAction}
                />
            </Card.Main>
        </Card>
    );
}

CommonCardFoodit.propTypes = {
    articleId: PropTypes.string.isRequired,
    linksProps: PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string
    }).isRequired,
    showTime: PropTypes.bool,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    variant: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string
        })
    ),
    loading: PropTypes.oneOf(['eager', 'lazy']),
    fetchPriority: PropTypes.oneOf(['high', 'low', 'auto']),
    tag: PropTypes.string,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    customTitle: PropTypes.string,
    author: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    titleEllipsis: PropTypes.number,
    contentCode: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    className: PropTypes.string,
    bookmarkAction: PropTypes.func,
    fill: PropTypes.bool,
    isOpening: PropTypes.bool,
    poster: PropTypes.string,
    mediaVariant: PropTypes.oneOf(['image', 'video']),
    hasVideo: PropTypes.bool,
    fatherType: PropTypes.string,
    isMyRecipesLayout: PropTypes.bool,
    onDelete: PropTypes.func,
    onMove: PropTypes.func
};

CommonCardFoodit.defaultProps = {
    showTime: false,
    time: '',
    size: '',
    variant: '',
    src: '',
    alt: '',
    sources: [],
    loading: 'lazy',
    fetchPriority: 'low',
    tag: '',
    customTitle: '',
    author: '',
    subtitle: '',
    label: 'Receta del día',
    titleEllipsis: 3,
    contentCode: '',
    container: 'grid',
    className: '',
    bookmarkAction: null,
    fill: false,
    isOpening: false,
    poster: '',
    mediaVariant: 'image',
    hasVideo: false,
    fatherType: '',
    isMyRecipesLayout: false,
    onDelete: null,
    onMove: null
};

export default CommonCardFoodit;
