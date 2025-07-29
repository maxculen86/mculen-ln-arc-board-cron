import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/foodit-ui-button';
import { buttonPropsByVariant } from './helpers';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const BARRIER_LOGGED = 'barrier-logged';
const BARRIER_UNLOGGED = 'barrier-unlogged';

function RenderButtons({ variant, userType, comesFrom = '' }) {
    const buttonCategorys = {
        DialogFoodit: 'modal_funcionalidades',
        CommentFoodit: 'funcionalidad_comentarios'
    };
    const button = buttonCategorys[comesFrom] || 'paginas_exclusivas';

    if (variant === '404' || variant === 'search-engine') return null;

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
                    onClick={() => {
                        addEventToDataLayerV2({
                            event: 'subscription_start',
                            button
                        });
                    }}
                >
                    {buttonPropsByVariant[BARRIER_LOGGED].label}
                </Button>
                <Button
                    variant={buttonPropsByVariant[BARRIER_UNLOGGED].variant}
                    href={buttonPropsByVariant[BARRIER_UNLOGGED].href}
                    onClick={() => {
                        addEventToDataLayerV2({
                            event: 'e_linkclick',
                            action: 'N/A',
                            label: 'inicia_sesion',
                            category: button
                        });
                    }}
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
            <Button
                variant={buttonVariant}
                href={href}
                onClick={() => {
                    addEventToDataLayerV2({
                        event: 'subscription_start',
                        button
                    });
                }}
            >
                {label}
            </Button>
        );
    }

    return null;
}

RenderButtons.propTypes = {
    variant: PropTypes.isRequired,
    userType: PropTypes.isRequired,
    comesFrom: PropTypes.string.isRequired
};

export default RenderButtons;
