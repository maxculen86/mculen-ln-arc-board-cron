import React from 'react';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';

export const getAssetsLeft = {
    arrowDark: <IconSprite name="arrowDark" fill="#fff" />,
    arrow: (
        <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 16.335L8.04 8.89504V8.81504L0 1.29504V0.415039L9.88 8.53504V9.17504L0 17.215V16.335Z"
                fill="#5A5A5A"
            />
        </svg>
    ),
    exclusivoSuscriptores: (
        <IconSprite name="exclusivoSuscriptores" critical fill="#FDB727" />
    )
};

export const getAssetsRight = {
    arrowContainer: <IconSprite name="arrowContainer" fill="#333" />,
    arrowContainerDark: <IconSprite name="arrowContainerDark" fill="#fff" />
};
