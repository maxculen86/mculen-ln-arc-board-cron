import React from 'react';
import classNames from 'classnames';
import { RenderPlans } from './RenderPlans';
import useGetUserConfig from '../../../../hooks/useGetUserConfig';
import LoginSubscribeButtons from '../../../SubscribeLoginButton/foodit';
import { useNavigationData } from '../../hooks/useNavigationData';

export function Promotions() {
    const { promotions } = useGetUserConfig();
    const { termicasData } = useNavigationData();

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
                comesFrom="HeaderFoodit"
                loginClassName="roboto-regular"
                buttonSubscribeText={buttonSubscribeText}
                buttonLogginText={buttonLogginText}
                termicasData={termicasData}
            />
        </div>
    );
}
