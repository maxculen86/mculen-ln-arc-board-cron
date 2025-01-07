import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/foodit-ui-button';
import { buttonPropsByVariant } from './helpers';

const BARRIER_LOGGED = 'barrier-logged';
const BARRIER_UNLOGGED = 'barrier-unlogged';

function RenderButtons({ variant, userType }) {
    if (variant === '404') return null;

    const {
        label,
        href,
        variant: buttonVariant
    } = buttonPropsByVariant[variant] || {};

    if (userType === 'unlogged') {
        return (
            <>
                <Button
                    variant={buttonPropsByVariant[BARRIER_LOGGED].variant}
                    href={buttonPropsByVariant[BARRIER_LOGGED].href}
                >
                    {buttonPropsByVariant[BARRIER_LOGGED].label}
                </Button>
                <Button
                    variant={buttonPropsByVariant[BARRIER_UNLOGGED].variant}
                    href={buttonPropsByVariant[BARRIER_UNLOGGED].href}
                >
                    <span className="uppercase">
                        {buttonPropsByVariant[BARRIER_UNLOGGED].label}
                    </span>
                </Button>
            </>
        );
    }

    if (userType === 'logged') {
        return (
            <Button variant={buttonVariant} href={href}>
                {label}
            </Button>
        );
    }

    return null;
}

RenderButtons.propTypes = {
    variant: PropTypes.isRequired,
    userType: PropTypes.isRequired
};

export default RenderButtons;
