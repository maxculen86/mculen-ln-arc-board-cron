import React from 'react';
import { CardCarruselProvider } from './CardContext';
import { cardContainerVariants } from './styles';
import CardMedia from './components/CardMedia';
import CardTitle from './components/CardTitle';
import CardDescription from './components/CardDescription';
import CardBadge from './components/CardBadge';

function CardVideo({ children, href, className, variant, ...props }) {
    const _className = cardContainerVariants({ variant, className });
    const Wrapper = href ? 'a' : 'article';

    return (
        <CardCarruselProvider value={{ variant }}>
            <Wrapper className={_className} href={href} {...props}>
                {children}
            </Wrapper>
        </CardCarruselProvider>
    );
}

CardVideo.Media = CardMedia;
CardVideo.Description = CardDescription;
CardVideo.Title = CardTitle;
CardVideo.Badge = CardBadge;

export default CardVideo;
