import React from 'react';
import Badge from '../badge/Badge';
import { EXCLUSIVE_LN } from '../badge/types';
import get from './get';

const getBadge = (contentCode, label) => {
    const text = get(label, 'text', '');
    const style = get(label, 'style', '');
    const className = get(label, 'className', '');

    const validations = {
        comun: () => {
            return (
                (text && text.trim() && (
                    <Badge className={`com-label ${className}`} type={style}>
                        {text.trim()}
                    </Badge>
                )) || <></>
            );
        },
        cerrada: () => {
            return <Badge className="com-label" type={EXCLUSIVE_LN} />;
        }
    };

    return validations[contentCode]
        ? validations[contentCode]()
        : validations.comun();
};

export default getBadge;
