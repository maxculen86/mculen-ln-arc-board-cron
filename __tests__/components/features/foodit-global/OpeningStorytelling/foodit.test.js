import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';

import { getTypeOfDevice } from '@ln/hooks';

import OpeningStorytelling from '../../../../../components/features/foodit-global/common/OpeningStorytelling/foodit';
import ArticleNotaVideo from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';
import ArticleNota from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/3WA35TYAJJBETLFALJ4U3YDAZM.json';

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
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

        const articleWithVideo = {
            ...ArticleNotaVideo,
            promoItems: ArticleNotaVideo.promo_items,
            headlines: ArticleNotaVideo.headlines
        };

        const { container } = render(
            <OpeningStorytelling article={articleWithVideo} />
        );
        expect(container).toBeTruthy();

        expect(container.querySelector('video')).toBeTruthy();
        expect(container.querySelector('picture')).not.toBeTruthy();
    });

    it('OpeningStorytelling with video, mobile device', () => {
        getTypeOfDevice.mockImplementation(() => 'mobile');

        const articleWithVideo = {
            ...ArticleNotaVideo,
            promoItems: ArticleNotaVideo.promo_items,
            headlines: ArticleNotaVideo.headlines
        };

        const { container } = render(
            <OpeningStorytelling article={articleWithVideo} />
        );
        expect(container).toBeTruthy();

        expect(container.querySelector('video')).not.toBeTruthy();
        const picture = container.querySelector('picture');
        expect(picture).toBeTruthy();
        expect(picture.childElementCount).toBe(2);
    });

    it('OpeningStorytelling without video', () => {
        const articleWithoutVideo = {
            ...ArticleNota,
            promoItems: ArticleNota.promo_items,
            headlines: ArticleNota.headlines
        };

        const { container } = render(
            <OpeningStorytelling article={articleWithoutVideo} />
        );
        expect(container).toBeTruthy();

        const picture = container.querySelector('picture');
        expect(picture).toBeTruthy();
        expect(picture.childElementCount).toBe(4);
    });
});
