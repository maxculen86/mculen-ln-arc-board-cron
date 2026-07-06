import { useMemo } from 'react';
import { useNavigationData } from '../common/Header/hooks/useNavigationData';
import get from '../../../private/common/utils/get';
import { mockConfigUserTypes } from '../common/utils/promotions';

export const useUserConfig = userType => {
    const {
        termicasData: {
            subscribe_button_header_text: subscribeButtonHeaderText
        } = {}
    } = useNavigationData();

    const config = useMemo(
        () => ({
            buttonLogginText: get(
                mockConfigUserTypes,
                `${userType}.buttonLogginText`,
                ''
            ),
            buttonSubscribeText: get(
                mockConfigUserTypes,
                `${userType}.buttonSubscribeText`,
                ''
            ),
            buttonSubscribeHeader:
                subscribeButtonHeaderText ||
                get(
                    mockConfigUserTypes,
                    `${userType}.buttonSubscribeHeader`,
                    ''
                ),
            plan: get(mockConfigUserTypes, `${userType}.plan`, ''),
            iconFoodit: get(
                mockConfigUserTypes,
                `${userType}.icons.foodit`,
                false
            ),
            iconClubLn: get(
                mockConfigUserTypes,
                `${userType}.icons.clubLn`,
                false
            ),
            containerClassName: get(
                mockConfigUserTypes,
                `${userType}.containerClassName`,
                ''
            )
        }),
        [userType, subscribeButtonHeaderText]
    );

    return { config };
};
