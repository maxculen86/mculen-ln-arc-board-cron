import React from 'react';
import { useCardCarruselContext } from '../CardContext';
import { cardTitleVariants } from '../styles';

function CardTitle({ title, lead, as = 'h2', className }) {
    const { variant } = useCardCarruselContext();
    const _classNames = cardTitleVariants({ variant, className });
    const TitleTag = as || 'h2';

    const Lead = lead ? (
        <span aria-label="Volanta del artículo" className="prumo prumo-black">
            {lead}
        </span>
    ) : null;

    if (!title) return null;
    return (
        <TitleTag className={_classNames}>
            {Lead} {title}
        </TitleTag>
    );
}

export default CardTitle;
