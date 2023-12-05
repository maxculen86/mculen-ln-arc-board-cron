import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Context from 'fusion:context';

import { getTypeOfDevice } from '@ln/hooks';

import OpeningStorytelling from '../../../../../components/features/foodit-global/common/OpeningStorytelling/foodit';
import ArticleNotaVideo from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';
import ArticleNota from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/3WA35TYAJJBETLFALJ4U3YDAZM.json';

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Foodit - OpeningStorytelling Component', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'foodit'
    }));

    it('renders without crashing when no props are provided', () => {
        const { container } = render(<OpeningStorytelling />);
        expect(container).toBeTruthy();
    });

    it('OpeningStorytelling with video', () => {
        getTypeOfDevice.mockImplementation(() => 'desktop');

        const { container } = render(
            <OpeningStorytelling article={ArticleNotaVideo} />
        );
        expect(container).toBeTruthy();

        expect(screen.getByText(`Ficha nota FOODIT`)).toBeInTheDocument();
        expect(
            screen.getByText(`Por Luca Di Leo y Leo Mechi`)
        ).toBeInTheDocument();

        expect(container.querySelector('video')).toBeTruthy();
        expect(container.querySelector('picture')).not.toBeTruthy();
    });

    it('OpeningStorytelling with video, mobile device', () => {
        getTypeOfDevice.mockImplementation(() => 'mobile');

        const { container } = render(
            <OpeningStorytelling article={ArticleNotaVideo} />
        );
        expect(container).toBeTruthy();

        expect(screen.getByText(`Ficha nota FOODIT`)).toBeInTheDocument();
        expect(
            screen.getByText(`Por Luca Di Leo y Leo Mechi`)
        ).toBeInTheDocument();

        expect(container.querySelector('video')).not.toBeTruthy();

        const picture = container.querySelector('picture');
        expect(picture).toBeTruthy();
        expect(picture.childElementCount).toBe(2);
    });

    it('OpeningStorytelling without video', () => {
        const { container } = render(
            <OpeningStorytelling article={ArticleNota} />
        );
        expect(container).toBeTruthy();

        expect(screen.getByText(`Ficha Nota Sin video`)).toBeInTheDocument();
        expect(screen.getByText(`Por Graciela Melgarejo`)).toBeInTheDocument();

        const picture = container.querySelector('picture');
        expect(picture).toBeTruthy();
        expect(picture.childElementCount).toBe(4);
    });
});
