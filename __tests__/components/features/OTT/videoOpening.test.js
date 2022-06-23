import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoOpening from '../../../../components/features/OTT/videoOpening';
import '@testing-library/jest-dom';

describe('VideoOpening OTT - live', () => {
    test('Return test when hideVideoFeature is false', () => {
        const props = {
            customFields: {
                url:
                    'https://www.youtube.com/embed/HYxWurJ3ejE?frameborder=0&mute=1&autoplay=1&amp;rel=0&amp;showinfo=0',
                hideVideoFeature: false
            }
        };

        const { container } = render(<VideoOpening {...props} />);
        const sectionOpening = container.getElementsByClassName('apertura');

        expect(screen.getByRole('heading', { name: 'LN+ En Vivo' }));
        expect(sectionOpening).toMatchSnapshot();
    });

    test('Return test when hideVideoFeature is true', () => {
        const props = {
            customFields: {
                url:
                    'https://www.youtube.com/embed/HYxWurJ3ejE?frameborder=0&mute=1&autoplay=1&amp;rel=0&amp;showinfo=0',
                hideVideoFeature: true
            }
        };

        const { container } = render(<VideoOpening {...props} />);

        expect(container).toMatchInlineSnapshot('<div />');
    });

    test('Return test when url is empty string', () => {
        const props = {
            customFields: {
                url: '',
                hideVideoFeature: false
            }
        };

        const { container } = render(<VideoOpening {...props} />);

        expect(container).toMatchInlineSnapshot('<div />');
    });

    test('return test when url is a string with empty spaces', () => {
        const props = {
            customFields: {
                url: ' ',
                hideVideoFeature: false
            }
        };

        const { container } = render(<VideoOpening {...props} />);

        expect(container).toMatchInlineSnapshot('<div />');
    });
});
