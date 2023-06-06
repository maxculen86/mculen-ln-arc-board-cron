import React from 'react';
import Consumer from 'fusion:consumer';
import WebStoryFeature from '../../../../../components/features/LN-10/webStory/default';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import '@testing-library/jest-dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => []
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('components - feature - ln10 - webstory', () => {
    Context.useAppContext = jest.fn(() => ({
        isAdmin: false,
        layout: 'LN10-Home_Main',
        arcSite: 'la-nacion-ar'
    }));

    const getCustomFields = (title, lead, link, imageId) => ({
        title,
        lead,
        link,
        imageId
    });

    it('should match snapshot', () => {
        const { container } = render(
            <WebStoryFeature
                id={'AKWJ178JAK8'}
                customFields={getCustomFields(
                    'Titulo',
                    'Volanta',
                    'www.lanacion.com.ar',
                    '89P13'
                )}
                renderables={[{}]}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it('should have data-... attributes', () => {
        render(
            <WebStoryFeature
                id={'AKWJ178JAK8'}
                customFields={getCustomFields(
                    'Titulo',
                    'Volanta',
                    'www.lanacion.com.ar',
                    '89P13'
                )}
                renderables={[{}]}
            />
        );

        const article = screen.getByRole('article');

        expect(article).toHaveAttribute('data-pos', '0000');
        expect(article).toHaveAttribute('data-notaid', '89P13');
        expect(article).toHaveAttribute('data-id', '89P13');
    });
});
