import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SubHeaderLN from '../../../../../../components/features/LN-10-global/header/subHeader/default';
import {
    setDollarData,
    setAccessData
} from '../../../../../../components/features/LN-10-global/header/subHeader/_helper';
import IconSprite from '../../../../../../components/features/private-global/common/iconSprite/IconSprite';
import {
    setEventsAccess,
    setEventsDollar
} from '../../../../../../components/private/common/utils/eventsHelper';
import dollarData from '../../../../../../__mocks__/data/LN10_SubHeader/dollarData.json';
import subHeaderEventLog from '../../../../../../__mocks__/data/LN10_SubHeader/subHeaderEventLogResult.json';
import { useHeaderContext } from '../../../../../../components/features/LN-10-global/header/context';

jest.mock('../../../../../../components/private/common/hooks/useTermica', () =>
    jest.fn()
);

const mockDollar = dollarData;
const mockAccess = [
    {
        icon: <IconSprite name="bookmark" critical />,
        text: 'Mis notas',
        href: 'https://www.lanacion.com.ar/mis-notas/'
    },
    {
        icon: <IconSprite name="emailOpen" critical />,
        text: 'Newsletters',
        href:
            'https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
    },
    {
        icon: <IconSprite name="clubLnDefault" critical />,
        text: 'Club LA NACION',
        href:
            'https://club.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274'
    }
];

jest.mock(
    '../../../../../../components/features/LN-10-global/header/subHeader/_helper',
    () => ({
        setDollarData: jest.fn(),
        setAccessData: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);

jest.mock('fusion:context', () => ({
    useAppContext: () => {
        return { contextPath: 'pf', deployment: () => {} };
    }
}));

describe('components - features - LN-10-global - subHeader - default', () => {
    global.window.dataLayer = [];
    afterAll(() => {
        jest.clearAllMocks();
    });
    test('should renders with dollar mock data', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: true
        }));

        setDollarData.mockImplementation(() => mockDollar);
        const { getByText } = render(<SubHeaderLN />);

        mockDollar.forEach(dollar => {
            expect(getByText(dollar.title)).toBeInTheDocument();
            expect(getByText(dollar.title).getAttribute('href')).toEqual(
                dollar.link
            );
            expect(getByText(`$${dollar.venta}`)).toBeInTheDocument();
        });
    });

    test('should renders with access mock data', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: true
        }));
        setAccessData.mockImplementation(() => mockAccess);

        const { getByText } = render(<SubHeaderLN />);

        mockAccess.forEach(access => {
            expect(getByText(access.text)).toBeInTheDocument();
            expect(getByText(access.text).getAttribute('href')).toEqual(
                access.href
            );
        });
    });

    test('should works okay with empty state', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: true
        }));
        setDollarData.mockImplementation(() => undefined);
        setAccessData.mockImplementation(() => undefined);
        expect(render(<SubHeaderLN />)).toBeTruthy();
    });

    test('should match snapshot of SubHeader', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: true
        }));
        setDollarData.mockImplementation(() => mockDollar);
        setAccessData.mockImplementation(() => mockAccess);

        const { container } = render(<SubHeaderLN />);

        expect(container).toMatchSnapshot();
    });
    // TODO: REFACTOR HEADER
    test('should register in dataLayer the click events of each link', () => {
        useHeaderContext.mockImplementation(() => ({
            isHome: true
        }));
        setDollarData.mockImplementation(() => mockDollar);
        setAccessData.mockImplementation(() => mockAccess);

        render(<SubHeaderLN />);
        setEventsDollar();
        setEventsAccess();
        const links = screen.getAllByRole('link');
        links.forEach(link => {
            link.click();
        });
        expect(window.dataLayer).toEqual(subHeaderEventLog);
    });
});
