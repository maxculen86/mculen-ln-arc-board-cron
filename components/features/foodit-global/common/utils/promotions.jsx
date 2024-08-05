import React from 'react';
import get from '../../../../private/common/utils/get';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

// TODO: Aplicar logica para obtener promociones de suscripcion desde sites.
const JC_BETWEEN = 'jc-between';

export const mockConfigUserTypes = {
    unlogged: {
        buttonLogginText: 'INICIAR SESIÓN',
        buttonSubscribeText: 'SUSCRIBITE GRATIS',
        containerClassName: 'jc-center'
    },
    logged: {
        buttonSubscribeText: 'SUSCRIBITE GRATIS',
        plan: 'Gratis',
        containerClassName: JC_BETWEEN
    },
    subscribed: {
        // TODO: Implementacion upsellin queda para proximo MVP
        // buttonSubscribeText: 'MEJORA TU PLAN',
        plan: 'Digital',
        icons: {
            foodit: {
                element: <IconSprite name="foodit" />,
                backgroudColor: '#143318'
            }
        },
        containerClassName: JC_BETWEEN
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
        containerClassName: JC_BETWEEN
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
