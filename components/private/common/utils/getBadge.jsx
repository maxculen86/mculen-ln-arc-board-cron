import React from 'react';
import Badge from '../badge/Badge';
import { EXCLUSIVE_LN } from '../badge/types';
import get from './get';

const getBadge = (contentCode, label) => {
    const text = get(label, 'text', '');
    const style = get(label, 'style', '');

    const validations = {
        comun: () => {
            return (
                text.trim() && (
                    <Badge className="com-label" type={style}>
                        {text.trim()}
                    </Badge>
                )
            );
        },
        cerrada: () => {
            return <Badge className="com-label" type={EXCLUSIVE_LN} />;
        }
    };

    return validations[contentCode]();
};

export default getBadge;
