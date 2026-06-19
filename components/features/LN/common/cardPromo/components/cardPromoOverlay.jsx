import React from 'react';
import CardPromoBadge from './cardPromoBadge';
import CardPromoRibbon from './cardPromoRibbon';

function CardPromoOverlay({ ribbon, badge, badgeLabel }) {
    if (!ribbon && !badge) return null;

    return ribbon ? <CardPromoRibbon /> : <CardPromoBadge label={badgeLabel} />;
}

CardPromoOverlay.displayName = 'CardPromo.Overlay';

export default CardPromoOverlay;
