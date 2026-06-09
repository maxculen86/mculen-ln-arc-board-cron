import React from 'react';
import { cx } from '@ln/cva';
import Icon from '../../../ui/ln/icon/default';

function SwitchToggle({
    selected = false,
    onChange,
    disabled = false,
    className,
    ...props
}) {
    return (
        <button
            {...props}
            type="button"
            role="switch"
            aria-checked={selected}
            onClick={onChange}
            disabled={disabled}
            className={cx(
                'relative inline-flex items-center rounded-full w-48 h-24 transition-colors cursor-pointer border-0 hover:opacity-80 p-4',
                selected ? 'bg-base-default' : 'bg-accent-lighten',
                disabled && 'opacity-40 cursor-not-allowed',
                className
            )}
        >
            <span
                aria-hidden="true"
                className={cx(
                    'absolute flex items-center justify-center rounded-full bg-white size-16 transition-transform',
                    selected ? 'translate-x-22' : 'translate-x-2'
                )}
            >
                <Icon name={selected ? 'check' : 'close'} size={12} />
            </span>
        </button>
    );
}

export default SwitchToggle;
