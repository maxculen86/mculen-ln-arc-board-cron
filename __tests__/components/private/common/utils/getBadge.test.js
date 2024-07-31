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
            '<i class="icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="#FDB727"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M16.991 11.8921C17.2038 11.6558 17.3333 11.343 17.3333 11C17.3333 10.2636 16.7364 9.66669 16 9.66669C15.2636 9.66669 14.6667 10.2636 14.6667 11C14.6667 11.3431 14.7962 11.6558 15.009 11.8921L12.9004 14.6914L10.6407 13.2629C10.6577 13.1779 10.6667 13.09 10.6667 13C10.6667 12.2636 10.0697 11.6667 9.33333 11.6667C8.59695 11.6667 8 12.2636 8 13C8 13.7364 8.59695 14.3334 9.33333 14.3334C9.36509 14.3334 9.39658 14.3322 9.42778 14.3301L10.3563 21.8142C10.393 22.1102 10.6576 22.3334 10.972 22.3334H21.0281C21.3424 22.3334 21.607 22.1102 21.6438 21.8142L22.5723 14.3301C22.6035 14.3322 22.6349 14.3334 22.6667 14.3334C23.403 14.3334 24 13.7364 24 13C24 12.2636 23.403 11.6667 22.6667 11.6667C21.9303 11.6667 21.3333 12.2636 21.3333 13C21.3333 13.09 21.3423 13.178 21.3593 13.263L19.0997 14.6914L16.991 11.8921Z" fill="#0D0D0D"></path></svg></i><span title="Este es un contenido cerrado a Suscriptores">Suscriptores</span>'
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
