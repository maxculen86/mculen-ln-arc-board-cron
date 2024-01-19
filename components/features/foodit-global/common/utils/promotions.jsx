import React from 'react';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

export const mockConfigUserTypes = {
    unlogged: {
        buttonLogginText: 'INICIAR SESIÓN',
        buttonSubscribeText: 'SUSCRIBIRSE POR $999',
        containerClassName: 'jc-center'
    },
    logged: {
        buttonSubscribeText: 'SUSCRIBIRSE POR $999',
        plan: 'Gratis',
        containerClassName: 'jc-between'
    },
    subscribed: {
        buttonSubscribeText: 'MEJORA TU PLAN',
        plan: 'Digital',
        icons: {
            foodit: {
                element: <IconSprite name="foodit" />,
                backgroudColor: '#143318'
            }
        },
        containerClassName: 'jc-between'
    },
    subscribedPlus: {
        plan: 'Digital + Club',
        icons: {
            foodit: {
                element: <IconSprite name="foodit" />,
                backgroudColor: '#143318'
            },
            clubLn: {
                element: <IconSprite name="club-ln" />,
                backgroudColor: '#0003A6'
            }
        },
        containerClassName: 'jc-between'
    }
};
export const getConfig = user => {
    return {
        buttonLogginText: get(
            mockConfigUserTypes,
            `${user}.buttonLogginText`,
            ''
        ),
        buttonSubscribeText: get(
            mockConfigUserTypes,
            `${user}.buttonSubscribeText`,
            ''
        ),
        plan: get(mockConfigUserTypes, `${user}.plan`, ''),
        iconFoodit: get(mockConfigUserTypes, `${user}.icons.foodit`, false),
        iconClubLn: get(mockConfigUserTypes, `${user}.icons.clubLn`, false),
        containerClassName: get(
            mockConfigUserTypes,
            `${user}.containerClassName`,
            ''
        )
    };
};
