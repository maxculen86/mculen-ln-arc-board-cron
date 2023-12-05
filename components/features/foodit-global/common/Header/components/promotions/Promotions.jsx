import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import { RenderPlans } from './RenderPlans';

import classNames from 'classnames';

export const Promotions = props => {
    const {
        buttonLogginText,
        plan,
        buttonSubscribeText,
        iconFoodit,
        iconClubLn,
        containerClassName
    } = props;

    const containerClasses = classNames(
        'promotions-container lg-none flex ai-center gap-24 w-100',
        containerClassName
    );

    return (
        <div className={containerClasses}>
            <RenderPlans
                plan={plan}
                iconClubLn={iconClubLn}
                iconFoodit={iconFoodit}
            />
            {buttonSubscribeText && (
                <Button title="Suscribirse" variant="accent" size={32}>
                    {buttonSubscribeText}
                </Button>
            )}
            {buttonLogginText && (
                <Button title="Iniciar sesión" variant="link">
                    {buttonLogginText}
                </Button>
            )}
        </div>
    );
};
