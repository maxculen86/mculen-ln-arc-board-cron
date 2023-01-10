import React from 'react';
import Anticipo from '../../../../components/features/LN-common/LN10_anticipo/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Components - Features - Anticipo =>', () => {
    const mock = {
        title: 'Prueba Anticipo',
        url: 'https://www.lanacion.com.ar/',
        hide: false,
        textBadge: 'chapita',
        lead: 'texto'
    };
    const video =
        '<iframe src="https://www.youtube.com/embed/mGcFszPShHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

    describe('LN10 Anticipo', () => {
        it('should render ComAdvance component with correctly props', () => {
            const { container } = render(
                <Anticipo customFields={{ ...mock }} />
            );
            const title = container.querySelector('h2');
            expect(title).toHaveTextContent('Prueba Anticipo');
            const textBadge = container.querySelector('span');
            expect(textBadge).toHaveTextContent('chapita');
            const lead = container.querySelector('span.lead');
            expect(lead).toHaveTextContent('texto');
            expect(screen.getByRole('link').href).toEqual(
                'https://www.lanacion.com.ar/'
            );
        });

        it('should not render Anticipo when prop hide is true', () => {
            const { container } = render(
                <Anticipo customFields={{ ...mock, hide: true }} />
            );
            expect(container).toMatchInlineSnapshot('<div />');
        });

        it('Snapshot Feature Anticipo with video', () => {
            const { container } = render(
                <Anticipo customFields={{ ...mock, video }} />
            );
            expect(container).toMatchSnapshot();
        });
    });
});
