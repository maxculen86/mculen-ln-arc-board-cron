import React, { forwardRef } from 'react';
import { Formcontrol as CommonFormcontrol } from '@ln/ds-common-formcontrol';

const Formcontrol = forwardRef(({ children, className, ...props }, ref) => (
    <CommonFormcontrol ref={ref} className={className} {...props}>
        {children}
    </CommonFormcontrol>
));

Formcontrol.Input = CommonFormcontrol.Input;
Formcontrol.Adornment = CommonFormcontrol.Adornment;
Formcontrol.Label = CommonFormcontrol.Label;

export default Formcontrol;
