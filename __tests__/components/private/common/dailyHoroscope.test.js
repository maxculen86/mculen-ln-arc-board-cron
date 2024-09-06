import React from 'react';
import { render, screen } from '@testing-library/react';
import DailyHoroscope from '../../../../components/private/common/dailyHoroscope';
import { removeAccents } from '../../../../components/private/common/utils/dailyHoroscopeHelper';

jest.mock('fusion:environment', () => ({
    ARC_STATIC: 'https://arc-static.glanacion.com'
}));

const props = {
    classCondition: 'test-class',
    data: {
        nombre: 'Aries',
        periodo: '21/3 al 20/4',
        autor: 'Renata Dossi',
        detalle: 'Este es el detalle del horóscopo.',
        elementos: {
            Amor: 'Buen día para el amor.',
            Riqueza: 'Finanzas estables.',
            Bienestar: 'Sentirse bien.'
        }
    },
    deployment: value => value,
    contextPath: '/pf'
};

const imageSrc = horoscope =>
    `https://arc-static.glanacion.com/pf/resources/images/horoscope-logos/${removeAccents(
        horoscope
    )}.svg`;

describe('DailyHoroscope', () => {
    it('renders correctly with all data', () => {
        const { nombre, detalle, periodo, autor } = props.data;
        const { container } = render(<DailyHoroscope {...props} />);

        const articleElement = screen.getByRole('article');
        const headerElement = container.querySelector('header');
        const mainElement = screen.getByRole('main');
        expect(articleElement).toHaveClass('daily-horoscope test-class');
        expect(headerElement).toHaveClass('daily-horoscope-header');
        expect(mainElement).toHaveClass('daily-horoscope-main');

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', props.data.nombre);
        expect(img).toHaveAttribute('src', imageSrc(nombre));

        expect(screen.getByText(/Horóscopo de/)).toBeInTheDocument();
        expect(screen.getByText(`${nombre} HOY`)).toBeInTheDocument();
        expect(screen.getByText(periodo)).toBeInTheDocument();
        expect(screen.getByText(detalle)).toBeInTheDocument();
        expect(screen.getByText(autor)).toBeInTheDocument();

        const { Amor, Riqueza, Bienestar } = props.data.elementos;
        expect(screen.getByText(Amor)).toBeInTheDocument();
        expect(screen.getByText(Riqueza)).toBeInTheDocument();
        expect(screen.getByText(Bienestar)).toBeInTheDocument();
    });

    it('renders without author when not provided', () => {
        const dataWithoutAuthor = { ...props.data, autor: '' };
        const { autor } = props.data;

        render(<DailyHoroscope {...props} data={dataWithoutAuthor} />);

        expect(screen.queryByText('Por')).toBeNull();
        expect(screen.queryByText(autor)).toBeNull();
    });
});
