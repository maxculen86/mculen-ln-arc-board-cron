import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBadge from '../../../../../components/private/common/utils/getBadge';

describe('Test for getBadge when note is comun', () => {
    const contentRestrictions = 'comun';
    const label = {
        text: 'Chapita',
        style: 'liveblog'
    };

    test('Test return when style is liveblog', () => {
        const { container } = render(getBadge(contentRestrictions, label));
        const span = container.querySelector('span');
        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'span'
            )
        ).toBeVisible();

        expect(span.innerHTML).toEqual(
            '<div class="live"><div class="circle"></div><div class="ringring"></div></div>Chapita'
        );

        expect(
            container.getElementsByClassName(
                'badge --sixxs com-label --liveblog'
            ).length
        ).toBe(1);
    });
});

describe('Test getBadge when is note closed', () => {
    const contentRestrictions = 'cerrada';
    const label = {};

    test('Test return when is note closed', () => {
        const { container } = render(getBadge(contentRestrictions, label));
        const span = container.querySelector('span');

        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'svg'
            )
        ).toBeVisible();

        expect(span.innerHTML).toEqual(
            '<i class="com-icon icon-exclusive-ln"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#FDB727"></rect><g clip-path="url(#clip0_9182_46364)"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.49549 5.946C8.6019 5.82787 8.66667 5.67149 8.66667 5.49998C8.66667 5.13179 8.36819 4.83331 8 4.83331C7.63181 4.83331 7.33333 5.13179 7.33333 5.49998C7.33333 5.6715 7.39811 5.82789 7.50452 5.94602L6.45021 7.34568L5.32037 6.63144C5.32887 6.58894 5.33333 6.54498 5.33333 6.49998C5.33333 6.13179 5.03486 5.83331 4.66667 5.83331C4.29848 5.83331 4 6.13179 4 6.49998C4 6.86817 4.29848 7.16665 4.66667 7.16665C4.68254 7.16665 4.69829 7.16609 4.71389 7.165L5.17816 10.9071C5.19652 11.0551 5.32882 11.1666 5.486 11.1666H10.514C10.6712 11.1666 10.8035 11.0551 10.8219 10.9071L11.2861 7.165C11.3017 7.16609 11.3175 7.16665 11.3333 7.16665C11.7015 7.16665 12 6.86817 12 6.49998C12 6.13179 11.7015 5.83331 11.3333 5.83331C10.9651 5.83331 10.6667 6.13179 10.6667 6.49998C10.6667 6.54499 10.6711 6.58895 10.6796 6.63145L9.54984 7.34568L8.49549 5.946Z" fill="#0D0D0D"></path></g><defs><clipPath id="clip0_9182_46364"><rect width="8" height="8" fill="white" transform="translate(4 4)"></rect></clipPath></defs></svg></i><span title="Este es un contenido cerrado a Suscriptores">Suscriptores</span>'
        );
    });
});

describe('Test getBadge when the props are undefined', () => {
    const contentRestrictions = undefined;
    const label = {
        text: 'Chapita',
        style: 'liveblog'
    };

    test('Test return when contentRestrictions are undefined', () => {
        const { container } = render(getBadge(contentRestrictions, label));
        const span = container.querySelector('span');

        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'span'
            )
        ).toBeVisible();

        expect(span.innerHTML).toEqual(
            '<div class="live"><div class="circle"></div><div class="ringring"></div></div>Chapita'
        );
    });

    test('Test return when contentRestrictions and text is undefined', () => {
        const contentRestrictions = undefined;
        const label = {
            text: undefined,
            style: 'liveblog'
        };

        expect(getBadge(contentRestrictions, label)).toEqual(
            <React.Fragment />
        );
    });
});
