import React from 'react';
import { Card } from '@ln/foodit-ui-card';

const CommonCardFoodit = ({ article = {}, className = '' }) => {
    const {
        title,
        author,
        time,
        image = {},
        href,
        variant,
        tag,
        size
    } = article;
    const { alt_text, url } = image;

    return (
        <Card
            linkProps={{ href, title }}
            size={size}
            variant={variant}
            className={className}
        >
            <Card.Top>
                <Card.Image src={url} alt={alt_text} />
                {tag && <Card.Badge>{tag}</Card.Badge>}
            </Card.Top>
            <Card.Main title={title}>
                <Card.Footer
                    author={author}
                    showTime={Boolean(time)}
                    time={time + ' min'}
                    // TODO: revisar interaccion click (home SSR)
                    buttonProps={{
                        title: 'Guardar receta',
                        fill: false, // true cuando la receta está guardada
                        onClick: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('click button');
                        },
                        text: 'Guardar'
                    }}
                />
            </Card.Main>
        </Card>
    );
};

export default CommonCardFoodit;
