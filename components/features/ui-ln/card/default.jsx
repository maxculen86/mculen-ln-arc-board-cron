import React from 'react';
import { Cardv2 as CommonCard } from '@ln/contenidos-ui-cardv2';

export function CardVertical(props) {
    return <CommonCard variant="vertical" {...props} />;
}

CardVertical.Media = CommonCard.Media;
CardVertical.Description = CommonCard.Description;
CardVertical.Title = CommonCard.Title;

CardVertical.propTypes = CommonCard.propTypes;
