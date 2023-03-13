import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SubHeader from '../../../../../components/private/LN10/subHeader/';
import {
    setDollarData,
    setAccessData
} from '../../../../../components/private/LN10/subHeader/_helper';
import {
    setEventsAccess,
    setEventsDollar
} from '../../../../../components/private/common/scriptManager/SubHeaderEventsScript/_helper';
import dollarData from '../../../../../__mocks__/data/LN10_SubHeader/dollarData.json';
import accessData from '../../../../../__mocks__/data/LN10_SubHeader/accessData.json';
import subHeaderEventLog from '../../../../../__mocks__/data/LN10_SubHeader/subHeaderEventLogResult.json';

jest.mock('../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

const mockDollar = dollarData;
const mockAccess = accessData;

jest.mock('../../../../../components/private/LN10/subHeader/_helper', () => ({
    setDollarData: jest.fn(),
    setAccessData: jest.fn()
}));

describe('Private - LN10 - SubHeader', () => {
    global.window.dataLayer = [];

    test('should renders with dollar mock data', () => {
        setDollarData.mockImplementation(() => mockDollar);

        const { getByText } = render(<SubHeader />);

        mockDollar.forEach(dollar => {
            expect(getByText(dollar.title)).toBeInTheDocument();
            expect(getByText(dollar.title).getAttribute('href')).toEqual(
                dollar.link
            );
            expect(getByText(`$${dollar.venta}`)).toBeInTheDocument();
        });
    });

    test('should renders with access mock data', () => {
        setAccessData.mockImplementation(() => mockAccess);

        const { getByText } = render(<SubHeader />);

        mockAccess.forEach(access => {
            expect(getByText(access.text)).toBeInTheDocument();
            expect(getByText(access.text).getAttribute('href')).toEqual(
                access.href
            );
        });
    });

    test('should works okay with empty state', () => {
        setDollarData.mockImplementation(() => undefined);
        setAccessData.mockImplementation(() => undefined);
        expect(render(<SubHeader />)).toBeTruthy();
    });

    test('should match snapshot of SubHeader', () => {
        setDollarData.mockImplementation(() => mockDollar);
        setAccessData.mockImplementation(() => mockAccess);

        const { container } = render(<SubHeader />);
        const subHeader = container.querySelector('.ln-sub-header');

        expect(subHeader).toMatchSnapshot();
    });

    test('should register in dataLayer the click events of each link', () => {
        setDollarData.mockImplementation(() => mockDollar);
        setAccessData.mockImplementation(() => mockAccess);

        render(<SubHeader />);
        setEventsDollar();
        setEventsAccess();
        const links = screen.getAllByRole('link');
        links.forEach(link => link.click());
        expect(window.dataLayer).toEqual(subHeaderEventLog);
    });
});
