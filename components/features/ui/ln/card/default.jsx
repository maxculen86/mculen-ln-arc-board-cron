import React from 'react';
import { Cardv2 as CommonCard } from '@ln/contenidos-ui-cardv2';

function CardVertical(props) {
    return <CommonCard variant="vertical" {...props} />;
}

export default CardVertical;

CardVertical.Media = CommonCard.Media;
CardVertical.Description = CommonCard.Description;
CardVertical.Title = CommonCard.Title;
