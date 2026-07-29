import React from 'react';
import { Badge } from '@ln/ds-common-badge';

function CardPromoBadge({ label = 'nuevo' }) {
    return (
        <div className="absolute z-10 top-4 right-4">
            <Badge
                color="black"
                variant="solid"
                size={24}
                rounded="custom"
                textTransform="uppercase"
                className="rounded-full"
            >
                {label}
            </Badge>
        </div>
    );
}

CardPromoBadge.displayName = 'Card.Badge';

export default CardPromoBadge;
