import React from 'react';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HolidaysCountdown from '../../../../../components/features/LN-services/holidaysCounter/default';
import mockCalendar from '../../../../../__mocks__/data/holidays/outputTransformHome.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));
jest.mock(
    '../../../../../components/private/LN/services/holidays/HolidaysCounter',
    () => 'mock-holidays-counter'
);
jest.mock(
    '../../../../../components/private/common/staticContent.jsx',
    () => 'mock-static-validation'
);
jest.mock(
    '../../../../../components/private/common/utils/dateAndTimeUtil',
    () => ({
        getSpecificDate: jest.fn().mockReturnValue(new Date(2023, 11, 8)),
        getArgentinaYear: jest.fn().mockReturnValue(2023),
        datesDiffInDays: jest.fn().mockReturnValue(5)
    })
);

describe('It renders holidays countdown', () => {
    const mockDateObject = new Date(2023, 6, 29);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDateObject);
    it('Should have a container and static component', () => {
        useContent.mockReturnValueOnce(mockCalendar);
        const { container } = render(<HolidaysCountdown />);

        expect(container).toBeTruthy();
        expect(
            container.getElementsByTagName('mock-static-validation')[0]
        ).toBeInTheDocument();
    });

    it('Should pass props to component', () => {
        useContent.mockReturnValueOnce(mockCalendar);
        const { container } = render(<HolidaysCountdown />);

        const counter = container.querySelector('mock-holidays-counter');

        expect(counter).toBeInTheDocument();
        expect(counter.getAttribute('description')).toBe(
            'Inmaculada Concepción de María.'
        );
        expect(counter.getAttribute('month')).toBe('Diciembre');
        expect(counter.getAttribute('nextholiday')).toBe('8');
        expect(counter.getAttribute('remainingdays')).toBe('5');
        expect(counter.getAttribute('typeholiday')).toBe('Inamovible');
    });
});

describe('Not rendering component', () => {
    it('Should return empty component', () => {
        const { container } = render(<HolidaysCountdown />);

        const counter = container.querySelector('mock-holidays-counter');
        expect(counter).toBeFalsy();
    });
});
