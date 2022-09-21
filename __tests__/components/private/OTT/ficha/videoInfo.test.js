import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoInfo from '../../../../../components/private/OTT/ficha/videoInfo';

describe('components - private - OTT - ficha - videoInfo', () => {
    it('should render VideoInfo correctly', () => {
        const classes = ['info-programa', 'meta-programa', 'fecha', 'titulo'];

        const { container } = render(
            <VideoInfo title={'Ln Mas'} date={'05/07/2022'} />
        );
        expect(screen.getByRole('heading')).toHaveTextContent('Ln Mas');
        expect(screen.getByText('05/07/2022')).toBeInTheDocument();

        classes.forEach(element =>
            expect(container.getElementsByClassName(element).length).toBe(1)
        );
    });
});
