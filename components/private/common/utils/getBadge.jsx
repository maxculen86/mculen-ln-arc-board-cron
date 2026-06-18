import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import RatingBadge from '../../../features/LN/common/ratingBadge/default';
import get from './get';
import Icon from '../../../features/ui/ln/icon/default';

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
        cerrada: () => (
            // TODO: borrar clase --exclusive-ln que usa estilos viejos cuando se migre card de autor de internas
            <div data-tw style={{ display: 'contents' }}>
                <div className="ln-badge --exclusive-ln flex items-center justify-center h-24 w-24 rounded-full border-neutral-1 border bg-warning-default">
                    <Icon
                        size={14}
                        name="logo-suscriptores"
                        fill="--color-primary-dark"
                    />
                </div>
            </div>
        )
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
