import React from 'react';
import { Button as CommonButton } from '@ln/ds-common-button';

/**
 * @typedef {import('@ln/ds-common-button').ButtonProps} ButtonProps
 */

/**
 * @param {ButtonProps} props
 * @returns {React.ReactElement}
 */
function Button(props) {
    return <CommonButton {...props} />;
}

export default Button;

Button.propTypes = CommonButton.propTypes;
