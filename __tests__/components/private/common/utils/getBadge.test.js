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
            '<i class="com-icon icon-exclusive-ln"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="28" height="28" rx="14" fill="#333333"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M9.88202 8.79102H4V9.8826H5.36524V17.6988H4V18.791H12.5981V14.5482H11.5001V15.1777C11.5001 16.2101 11.1645 16.8198 10.652 17.1835C10.1237 17.5583 9.37071 17.6988 8.48779 17.6988H8.37818V9.8826H9.88202V8.79102ZM17.5715 8.79102H13.298V9.8826H13.7435C14.1567 9.8826 14.5721 10.2215 14.5721 10.7347V16.94C14.5721 17.3143 14.4721 17.4833 14.3682 17.5684C14.2544 17.6618 14.0841 17.6988 13.8592 17.6988H13.2506V18.791H17.051V17.6988H16.5746C16.3638 17.6988 16.1947 17.6906 16.0585 17.6688C15.9221 17.6469 15.8319 17.6134 15.7704 17.572C15.6679 17.5029 15.5884 17.3717 15.5884 17.0109V11.4557L21.2351 18.791H22.6795V10.3952C22.6795 10.2885 22.7242 10.1664 22.8367 10.0677C22.9493 9.96896 23.1436 9.8826 23.456 9.8826H24V8.79102H20.1929V9.8826H20.8132C21.1354 9.8826 21.3478 9.94297 21.4746 10.0341C21.5882 10.1157 21.655 10.2374 21.655 10.4374V14.0769L17.5715 8.79102Z" fill="#FDB727"></path></svg></i><span title="Este es un contenido cerrado a Suscriptores">Exclusivo suscriptor</span>'
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
