import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import BajadaNota from '../../../../../components/private/LN/nota/bajada';

describe('Components - private - LN - nota', () => {
    test('With subheadline must be subheadline', () => {
        const { container } = render(
            <BajadaNota
                {...{
                    globalContent: {
                        subheadlines: { basic: 'Basic headline' },
                        subtype: '1',
                        display_date: '2023-09-14T16:02:28.163Z'
                    }
                }}
            />
        );
        expect(container).toMatchSnapshot();
    });

    test('Without subheadline and subtype diferent to video must be empty', () => {
        const { container } = render(
            <BajadaNota
                {...{
                    globalContent: {
                        subheadlines: { basic: '' },
                        subtype: '1',
                        display_date: '2023-09-14T16:02:28.163Z'
                    }
                }}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    test('Without subheadline and subtype  video must custom title and display date', () => {
        const { container } = render(
            <BajadaNota
                {...{
                    globalContent: {
                        subheadlines: { basic: '' },
                        subtype: '5',
                        display_date: '2023-09-14T16:02:28.163Z'
                    }
                }}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
