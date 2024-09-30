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
    author,
    subtitle,
    titleEllipsis,
    contentCode,
    container,
    className = '',
    bookmarkAction = null,
    fill = false,
    isOpening = false,
    hasVideo,
    hasVideobackground = false
}) {
    const showIconVideo = hasVideo && !hasVideobackground;
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
                <Card.Image
                    src={src}
                    alt={alt}
                    sources={sources}
                    loading={loading}
                    fetchPriority={fetchPriority}
                />
                {showIconVideo && <Card.BadgeIcon />}
                {tag && <Card.Badge>{tag}</Card.Badge>}
            </Card.Top>
            <Card.Main
                title={title}
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
                                    ids: [articleId]
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
    linksProps: PropTypes.isRequired,
    showTime: PropTypes.isRequired,
    time: PropTypes.isRequired,
    size: PropTypes.isRequired,
    variant: PropTypes.isRequired,
    src: PropTypes.isRequired,
    alt: PropTypes.isRequired,
    sources: PropTypes.isRequired,
    loading: PropTypes.isRequired,
    fetchPriority: PropTypes.isRequired,
    tag: PropTypes.isRequired,
    title: PropTypes.isRequired,
    author: PropTypes.isRequired,
    subtitle: PropTypes.isRequired,
    titleEllipsis: PropTypes.isRequired,
    contentCode: PropTypes.isRequired,
    container: PropTypes.isRequired,
    className: PropTypes.isRequired,
    bookmarkAction: PropTypes.isRequired,
    fill: PropTypes.isRequired,
    isOpening: PropTypes.isRequired,
    hasVideo: PropTypes.isRequired,
    hasVideobackground: PropTypes.isRequired
};
export default CommonCardFoodit;
