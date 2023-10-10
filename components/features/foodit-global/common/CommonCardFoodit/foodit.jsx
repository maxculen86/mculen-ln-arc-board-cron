import React from 'react';
import { Card } from '@ln/foodit-ui-card';
import { Badge } from '@ln/foodit-ui-badge';
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
                {tag && (
                    <Badge className="absolute bottom-0 right-0 m-8">
                        {tag}
                    </Badge>
                )}
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
                        }
                    }}
                />
            </Card.Main>
        </Card>
    );
};

export default CommonCardFoodit;
