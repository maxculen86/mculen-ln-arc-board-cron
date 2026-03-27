import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { SUBSCRIBER } from '../badge/types';
import RatingBadge from '../../../features/LN/common/ratingBadge/default';
import get from './get';

const getBadge = (contentCode, label, rating = false) => {
    const text = get(label, 'text', '');
    const style = get(label, 'style', '');
    const className = get(label, 'className', '');

    const validations = {
        comun: () =>
            text && text.trim() ? (
                <Badge className={className} type={style}>
                    {text.trim()}
                </Badge>
            ) : null,
        cerrada: () => <Badge type={SUBSCRIBER}>Suscriptores</Badge>
    };

    if (rating) {
        return (
            <div className="ln-rating-badge">
                <RatingBadge size={16} ratingProps={{ defaultValue: rating }} />
            </div>
        );
    }

    return validations[contentCode]
        ? validations[contentCode]()
        : validations.comun();
};

export default getBadge;
