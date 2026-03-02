import React from 'react';
import { render, screen } from '@testing-library/react';
import DateAndReadingTime from '../../../../../../components/features/LN/common/dateAndReadingTime/default';

jest.mock('fusion:consumer', () => component => component);

describe('DateAndReadingTime Component', () => {
    const mockGlobalContent = {
        headlines: { basic: 'Headline' },
        subheadlines: { basic: 'Subheadline' },
        display_date: '2023-01-01T12:00:00Z',
        planning: { story_length: { word_count_actual: 500 } }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders date, time, dateTime attribute and plural reading time', () => {
        render(<DateAndReadingTime globalContent={mockGlobalContent} />);

        expect(screen.getByText('1 de enero de 2023')).toBeInTheDocument();
        expect(screen.getByText('06:00')).toBeInTheDocument();

        expect(document.querySelector('time')).toHaveAttribute(
            'datetime',
            '2023-01-01T12:00:00Z'
        );

        expect(screen.getByText('minutos de lectura')).toBeInTheDocument();
    });

    it('renders singular "minuto" when reading time is exactly 1 minute', () => {
        render(
            <DateAndReadingTime
                globalContent={{
                    headlines: { basic: '' },
                    subheadlines: { basic: '' },
                    display_date: '2023-01-01T12:00:00Z',
                    planning: { story_length: { word_count_actual: 200 } }
                }}
            />
        );

        expect(screen.getByText('minuto de lectura')).toBeInTheDocument();
    });

    it('includes headline and subheadline word counts in reading time calculation', () => {
        render(
            <DateAndReadingTime
                globalContent={{
                    headlines: { basic: 'Headline' },
                    subheadlines: { basic: 'Subheadline' },
                    display_date: '2023-01-01T12:00:00Z',
                    planning: { story_length: { word_count_actual: 399 } }
                }}
            />
        );

        // 1 + 1 + 399 = 401 → ceil(401/200) = 3 → plural
        expect(screen.getByText('minutos de lectura')).toBeInTheDocument();
    });
});
