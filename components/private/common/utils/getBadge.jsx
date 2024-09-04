import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { SUBSCRIBER } from '../badge/types';
import get from './get';

const getBadge = (contentCode, label) => {
    const text = get(label, 'text', '');
    const style = get(label, 'style', '');
    const className = get(label, 'className', '');

    const validations = {
        comun: () => {
            return (
                (text && text.trim() && (
                    <Badge className={className} type={style}>
                        {text.trim()}
                    </Badge>
                )) || <></>
            );
        },
        cerrada: () => {
            return <Badge type={SUBSCRIBER}>Suscriptores</Badge>;
        }
    };

    return validations[contentCode]
        ? validations[contentCode]()
        : validations.comun();
};

export default getBadge;
