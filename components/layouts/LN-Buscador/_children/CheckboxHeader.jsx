import React from 'react';
import Checkbox from '../../../features/ui/ln/checkbox/default';

export default function CheckboxHeader({
    checkboxes = [],
    handleCheckBox = () => {}
}) {
    return (
        <>
            {checkboxes.map(({ key, value, checked, label }) => (
                <Checkbox
                    size="custom"
                    className="pt-12 [&>input]:w-20 [&>input]:h-20 [&>input]:border-2 [&>input]:border-base-default [&>input]:focus-visible:outline-none [&>input]:focus-visible:ring-2 [&>input]:focus-visible:ring-primary-default [&>input]:focus-visible:ring-offset-1"
                    labelClassName="text-[14px]"
                    label={
                        <>
                            {label || key}{' '}
                            <span className="text-12 text-base-light font-secondary">
                                ({value})
                            </span>
                        </>
                    }
                    checked={checked}
                    key={key}
                    onChange={event =>
                        handleCheckBox({
                            key,
                            checked: event?.target?.checked ?? false
                        })
                    }
                />
            ))}
        </>
    );
}
