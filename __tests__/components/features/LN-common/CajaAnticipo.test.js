import React from 'react';
import CajaAnticipo from '../../../../components/features/LN-common/cajaAnticipo/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Private - Feature - CajaAnticipo =>', () => {
    const mock = {
        title: 'Prueba Anticipo',
        link: 'https://www.lanacion.com.ar/',
        hide: false,
        hideBadge: false
    };

    describe('with empty location or type', () => {
        it('should returns fragment when prop customField is not defined', () => {
            const { container } = render(<CajaAnticipo />);
            expect(container).toMatchInlineSnapshot('<div />');
        });

        it('should returns fragment when prop hide is true', () => {
            const { container } = render(
                <CajaAnticipo customFields={{ ...mock, hide: true }} />
            );
            expect(container).toMatchInlineSnapshot('<div />');
        });

        it('should returns fragment when prop title is not defined', () => {
            const { container } = render(
                <CajaAnticipo customFields={{ ...mock, title: undefined }} />
            );
            expect(container).toMatchInlineSnapshot('<div />');
        });
    });

    describe('with a valid response', () => {
        it('should render ComAdvance component with correctly props', () => {
            const { container } = render(
                <CajaAnticipo customFields={{ ...mock }} />
            );

            expect(container).toHaveTextContent('Prueba Anticipo');
            expect(screen.getByRole('link').href).toEqual(
                'https://www.lanacion.com.ar/'
            );
        });

        it('should render ComAdvance component when prop hideBadge is true', () => {
            const { container } = render(
                <CajaAnticipo customFields={{ ...mock, hideBadge: true }} />
            );
            const badge = container.querySelector('span');

            expect(container).toHaveTextContent('Prueba Anticipo');
            expect(screen.getByRole('link').href).toEqual(
                'https://www.lanacion.com.ar/'
            );
            expect(badge).toHaveTextContent('EN VIVO');
        });

        it('Snapshot Feature CajaAnticipo', () => {
            const { container } = render(
                <CajaAnticipo customFields={{ ...mock, hideBadge: true }} />
            );

            expect(container).toMatchSnapshot();
        });
    });
});
