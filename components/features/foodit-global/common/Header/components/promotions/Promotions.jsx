import React from 'react';
import { RenderPlans } from './RenderPlans';
import LoginSubscribeButtons from '../LoginSubscribeButtons';
import useGetUserConfig from '../../../../hooks/useGetUserConfig';
import classNames from 'classnames';

export const Promotions = () => {
    const { promotions } = useGetUserConfig();

    const {
        buttonLogginText,
        plan,
        buttonSubscribeText,
        iconFoodit,
        iconClubLn,
        containerClassName
    } = promotions;

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

            <LoginSubscribeButtons
                buttonSubscribeText={buttonSubscribeText}
                buttonLogginText={buttonLogginText}
            />
        </div>
    );
};
