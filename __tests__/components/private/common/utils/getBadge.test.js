import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import getBadge from '../../../../../components/private/common/utils/getBadge';

describe('Test for getBadge when note is comun', () => {
    const contentRestrictions = 'comun';
    const label = {
        text: 'Chapita',
        style: 'live'
    };

    test('Test return when style is live', () => {
        const { container } = render(getBadge(contentRestrictions, label));
        const span = container.querySelector('span');

        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'span'
            )
        ).toBeVisible();

        expect(span).toHaveClass('--live');
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

        expect(span).toHaveClass('--exclusive-ln');
    });
});

describe('Test getBadge when the props are undefined', () => {
    const contentRestrictions = undefined;
    const label = {
        text: 'Chapita',
        style: 'live'
    };

    test('Test return when contentRestrictions are undefined', () => {
        const { container } = render(getBadge(contentRestrictions, label));
        const span = container.querySelector('span');

        expect(
            screen.getByText(
                (content, element) => element.tagName.toLowerCase() === 'span'
            )
        ).toBeVisible();

        expect(span).toHaveClass('--live');
    });

    test('Test return when contentRestrictions and text is undefined', () => {
        const contentRestrictions = undefined;
        const label = {
            text: undefined,
            style: 'live'
        };

        expect(getBadge(contentRestrictions, label)).toEqual(
            <React.Fragment />
        );
    });
});
