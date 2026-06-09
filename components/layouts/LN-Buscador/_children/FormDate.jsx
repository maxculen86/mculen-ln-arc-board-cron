import React, { useId } from 'react';
import Formcontrol from '../../../features/ui/ln/formControl/default';

function FormDate({ label, value, onChange, max }) {
    const id = useId();
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor={id} className="font-secondary text-label-md">
                {label}
            </label>
            <Formcontrol className="border-muted w-full max-h-48">
                <Formcontrol.Input
                    id={id}
                    type="date"
                    className="text-label-md placeholder:text-base-default"
                    value={value}
                    onChange={onChange}
                    max={max}
                />
            </Formcontrol>
        </div>
    );
}

export default FormDate;
