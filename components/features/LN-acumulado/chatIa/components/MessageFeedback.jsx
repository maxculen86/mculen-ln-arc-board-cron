import React, { useState } from 'react';
import { cx } from '@ln/ds-cva';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

export function MessageFeedbackLN() {
    const [selected, setSelected] = useState(null);

    const handleClick = type => {
        setSelected(prev => (prev === type ? null : type));
        if (selected === null) {
            addEventToDataLayerV2({
                rest: {
                    event: 'e_linkclick',
                    category: 'interaction',
                    label: 'chat_ia_mundial_2026',
                    action: type === 'like' ? 'like' : 'dislike'
                }
            });
        }
    };
    const feedbackOptions = [
        { type: 'like', iconClass: '' },
        { type: 'dislike', iconClass: '--rotate-180' }
    ];

    return (
        <div className="flex items-center gap-16 text-base-light">
            <p className="font-secondary text-small-lg">
                ¿Te resultó útil la respuesta?
            </p>
            {feedbackOptions.map(({ type, iconClass }) => (
                <Button
                    key={type}
                    size="custom"
                    variant="ghost"
                    type="button"
                    className="hover:bg-transparent px-0"
                    onClick={() => handleClick(type)}
                >
                    <Icon
                        size={16}
                        name={
                            selected === type ? 'thumb-up-filled' : 'thumb-up'
                        }
                        className={cx(
                            'hover:text-accent-default text-neutral-600',
                            iconClass
                        )}
                    />
                </Button>
            ))}
        </div>
    );
}
