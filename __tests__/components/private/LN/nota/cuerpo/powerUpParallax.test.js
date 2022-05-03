import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import PowerUpParallax from '../../../../../../components/private/LN/nota/cuerpo/powerUpParallax';
import IMAGE_DATA from '../../../../../../__mocks__/data/nota/cuerpo/image/image.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const props = {
    _id: '77NRHRWIWFCFDOCDN34LGQ32SE',
    type: 'custom_embed',
    subtype: 'custom-parallax',
    additional_properties: {
        _id: 'ZJHB6CNYBFHEJG4U5PF6FTRTXU',
        comments: []
    },
    data: {
        embed: {
            config: {},
            id: '15fe194324c0a9',
            url: 'https://www.lanacion.com.ar/'
        }
    }
};

describe('Components - Private - LN - Nota - Cuerpo - PowerUpParallax =>', () => {
    Context.useAppContext = jest.fn(() => ({
        arcSite: 'la-nacion-ar'
    }));
    it('Should show image and title', () => {
        props.data.embed.config = {
            imageId: IMAGE_DATA,
            title: 'Titulo parallax prueba'
        };

        render(<PowerUpParallax {...props} />);
        expect(screen.getAllByRole('img')).toHaveLength(1);
        expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
        const paragraph = screen.queryByText(
            'Esta es una prueba de parallax, con un parrafo de ejemplo para el test.'
        );
        expect(paragraph).toBeNull();
    });
    it('Should show image and title ', () => {
        props.data.embed.config = {
            imageId: IMAGE_DATA,
            paragraph:
                'Esta es una prueba de parallax, con un parrafo de ejemplo para el test.'
        };

        render(<PowerUpParallax {...props} />);
        expect(screen.getAllByRole('img')).toHaveLength(1);
        const title = screen.queryByText('Titulo parallax prueba');
        expect(title).toBeNull();
        expect(
            screen.getByText(props.data.embed.config.paragraph)
        ).toBeInTheDocument();
    });
    it('Should show image, title and paragraph', () => {
        props.data.embed.config = {
            imageId: IMAGE_DATA,
            title: 'Titulo parallax prueba',
            paragraph:
                'Esta es una prueba de parallax, con un parrafo de ejemplo para el test.'
        };
        render(<PowerUpParallax {...props} />);
        expect(screen.getAllByRole('img')).toHaveLength(1);
        expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
        expect(
            screen.getByText(props.data.embed.config.paragraph)
        ).toBeInTheDocument();
    });
    it('Should return null without title and paragraph', () => {
        props.data.embed.config = {
            imageId: IMAGE_DATA
        };
        const { container } = render(<PowerUpParallax {...props} />);
        expect(container).toBeEmptyDOMElement();
    });
});
