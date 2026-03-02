import React from 'react';
import { render, screen } from '@testing-library/react';
import DateAndReadingTime from '../../../../../../components/features/LN/common/dateAndReadingTime/default';

jest.mock('fusion:consumer', () => component => component);

describe('DateAndReadingTime Component', () => {
    const mockGlobalContent = {
        headlines: { basic: 'Headline' },
        subheadlines: { basic: 'Subheadline' },
        display_date: '2023-01-01T12:00:00Z',
        first_publish_date: '2023-01-01T12:00:00Z',
        last_updated_date: '2023-01-02T12:00:00Z',
        planning: { story_length: { word_count_actual: 500 } }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render date, time, reading time and update date when all data is available', () => {
        render(<DateAndReadingTime globalContent={mockGlobalContent} />);

        expect(
            screen.getByText('1 de enero de 2023 * 06:00')
        ).toBeInTheDocument();
        expect(screen.getByText('3 minutos de lectura')).toBeInTheDocument();
    });

    it('should return the last update date if the difference between the publication date and the creation date is met.', () => {
        render(
            <DateAndReadingTime
                globalContent={{
                    ...mockGlobalContent,
                    last_updated_date: '2022-01-02T12:00:00Z'
                }}
            />
        );

        expect(
            screen.getByText('1 de enero de 2023 * 06:00')
        ).toBeInTheDocument();
        expect(screen.getByText('3 minutos de lectura')).toBeInTheDocument();
        expect(screen.queryByText(/Actualizado el/)).not.toBeInTheDocument();
    });
});
