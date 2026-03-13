import React, { useState } from 'react';
import { Button } from '@ln/ds-common-button';
import { cx } from '@ln/ds-cva';
import Icon from '../../../../features/ui/foodit/icon/default';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

export function MessageFeedback() {
    const [selected, setSelected] = useState(null);

    const feedbackOptions = [
        { type: 'like', iconClass: '' },
        { type: 'dislike', iconClass: '--rotate-180' }
    ];

    function handleIcon(type) {
        setSelected(prev => (prev === type ? null : type));
        if (selected === null) {
            addEventToDataLayerV2({
                event: 'e_linkclick',
                category: 'interaction',
                label: 'Chat IA',
                action: type === 'like' ? 'Like' : 'Dislike'
            });
        }
    }

    return (
        <div className="flex items-center gap-16 text-neutral-600 pt-8">
            <p className="font-secondary text-12">
                ¿Te resultó útil la respuesta?
            </p>

            {feedbackOptions.map(({ type, iconClass }) => (
                <Button
                    key={type}
                    size="custom"
                    variant="ghost"
                    type="button"
                    className="hover:bg-transparent px-0"
                    onClick={() => handleIcon(type)}
                >
                    <Icon
                        size={16}
                        name={selected === type ? 'thumb-fill' : 'thumb'}
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
