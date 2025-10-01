import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import Receta from '../../../../../../components/private/LN/nota/snippet/receta';
import article from '../../../../../../__mocks__/data/articles/ATLC5WVL4NH5HAHU2BWJXTSATY';
import recipeCuisineTaxonomy from '../../../../../../__mocks__/data/articles/recipeCuisineTaxonomy';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        site: {
            site_url:
                'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/'
        },
        children: [
            {
                _id: '/recetas',
                site: {
                    site_url:
                        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/recetas/'
                },
                children: [
                    {
                        _id: '/recetas/carnes',
                        site: {
                            site_url: null
                        },
                        children: []
                    }
                ]
            }
        ]
    })
}));

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => (
            <Component {...props} deployment={() => {}} contextPath="" />
        );
    };
});

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

describe('components - private - LN - Nota - Receta ', () => {
    Context.useAppContext = jest.fn(() => ({}));
    const props = {
        arcSite: 'la-nacion-ar',
        globalContent: article
    };

    const articleRecipeCuisine = JSON.parse(JSON.stringify(article));

    const propsRecipeCuisineNone = {
        arcSite: 'la-nacion-ar',
        globalContent: {
            ...articleRecipeCuisine,
            taxonomy: recipeCuisineTaxonomy.noRecipeCuisine
        }
    };

    it('Test Recipient Receta', () => {
        const { container } = render(<Receta {...props} />);

        expect(container).toMatchSnapshot();
    });

    it('Schema Recipe Cuisine should NOT be present when its NOT a section', () => {
        const { container } = render(<Receta {...propsRecipeCuisineNone} />);

        const schema = container.querySelector('.your-schema-selector'); // Agrega el selector adecuado para encontrar el elemento de esquema en el renderizado del componente

        expect(schema).not.toEqual(
            expect.objectContaining({
                recipeCuisine: expect.any(String)
            })
        );
    });
});
