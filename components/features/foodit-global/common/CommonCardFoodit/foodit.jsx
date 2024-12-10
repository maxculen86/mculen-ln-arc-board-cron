import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Card } from '@ln/foodit-ui-card';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { BOOKMARK_FILLED } from '../bookmark/iconHelper';

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
    mediaVariant = 'image'
}) {
    const showIconVideo = hasVideo && mediaVariant !== 'video';

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
        >
            <Card.Top>
                <Card.Media
                    variant={mediaVariant}
                    alt={alt}
                    sources={sources}
                    loading={loading}
                    fetchPriority={fetchPriority}
                    src={src}
                    {...(mediaVariant === 'video' && {
                        dataSrc: src,
                        poster,
                        muted: true,
                        loop: true
                    })}
                />
                {showIconVideo && <Card.BadgeIcon />}
                {tag && <Card.Badge>{tag}</Card.Badge>}
            </Card.Top>
            <Card.Main
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
                    buttonProps={{
                        title: 'Guardar receta',
                        'data-id': articleId,
                        'data-modal': 'open-modal',
                        'data-test-id': `button-bookmark-${articleId}`,
                        ...(fatherType && { 'data-father-type': fatherType }),
                        text: 'Guardar',
                        icon: (
                            <IconSprite
                                name={fill ? BOOKMARK_FILLED : 'bookmark'}
                                critical={!fill}
                            />
                        ),
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (bookmarkAction) {
                                bookmarkAction();
                            } else {
                                window?.LN?.observable?.publish('openModal', {
                                    ids: [articleId],
                                    fatherType
                                });
                            }
                        }
                    }}
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
    size: PropTypes.string,
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
    customTitle: PropTypes.string,
    author: PropTypes.string,
    subtitle: PropTypes.string,
    titleEllipsis: PropTypes.number,
    contentCode: PropTypes.string,
    container: PropTypes.string,
    className: PropTypes.string,
    bookmarkAction: PropTypes.func,
    fill: PropTypes.bool,
    isOpening: PropTypes.bool,
    poster: PropTypes.string,
    mediaVariant: PropTypes.oneOf(['image', 'video']),
    hasVideo: PropTypes.bool,
    fatherType: PropTypes.string
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
    titleEllipsis: 3,
    contentCode: '',
    container: '',
    className: '',
    bookmarkAction: null,
    fill: false,
    isOpening: false,
    poster: '',
    mediaVariant: 'image',
    hasVideo: false,
    fatherType: ''
};

export default CommonCardFoodit;
