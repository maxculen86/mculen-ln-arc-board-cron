import React from 'react';
import { Card } from '@ln/foodit-ui-card';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

const CommonCardFoodit = ({
    articleId,
    linksProps,
    className = '',
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
    fill = false,
    title,
    author,
    subtitle,
    bookmarkAction = null,
    titleEllipsis
}) => {
    return (
        <Card
            linkProps={linksProps}
            size={size}
            variant={variant}
            className={className}
        >
            <Card.Top>
                <Card.Image
                    src={src}
                    alt={alt}
                    sources={sources}
                    loading={loading}
                    fetchPriority={fetchPriority}
                />

                {tag && <Card.Badge>{tag}</Card.Badge>}
            </Card.Top>
            <Card.Main
                title={title}
                titleTag={variant === 'day-recipe' ? 'h1' : undefined}
                subtitle={subtitle}
                titleEllipsis={titleEllipsis}
            >
                <Card.Footer
                    author={author}
                    showTime={Boolean(time) && showTime}
                    time={time + ' min'}
                    icon={<IconSprite name="timer" />}
                    buttonProps={{
                        title: 'Guardar receta',
                        'data-id': articleId,
                        'data-modal': 'open-modal',
                        text: 'Guardar',
                        icon: (
                            <IconSprite
                                name={fill ? 'bookmark-filled' : 'bookmark'}
                                critical={!fill}
                            />
                        ),
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (bookmarkAction) {
                                bookmarkAction();
                            } else {
                                window.LN.observable.publish('openModal', {
                                    ids: [articleId]
                                });
                            }
                        }
                    }}
                />
            </Card.Main>
        </Card>
    );
};

export default CommonCardFoodit;
