import React from 'react';
import { Card } from '@ln/foodit-ui-card';

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
    author
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
            <Card.Main title={title}>
                <Card.Footer
                    author={author}
                    showTime={Boolean(time) && showTime}
                    time={time + ' min'}
                    // TODO: revisar interaccion click (home SSR)
                    buttonProps={{
                        title: 'Guardar receta',
                        fill, // TODO: true cuando la receta está guardada
                        'data-id': articleId,
                        'data-modal': 'open-modal',
                        text: 'Guardar',
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('click button');
                        }
                    }}
                />
            </Card.Main>
        </Card>
    );
};

export default CommonCardFoodit;
