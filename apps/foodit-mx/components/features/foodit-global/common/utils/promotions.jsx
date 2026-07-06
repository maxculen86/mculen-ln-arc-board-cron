import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const JC_BETWEEN = 'jc-between';

export const mockConfigUserTypes = {
    unlogged: {
        buttonLogginText: 'INICIÁ SESIÓN',
        buttonSubscribeText: 'SUSCRIBITE',
        buttonSubscribeHeader: 'SUSCRIBITE GRATIS',
        containerClassName: 'jc-center'
    },
    logged: {
        buttonSubscribeText: 'SUSCRIBITE',
        buttonSubscribeHeader: 'SUSCRIBITE GRATIS',
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
