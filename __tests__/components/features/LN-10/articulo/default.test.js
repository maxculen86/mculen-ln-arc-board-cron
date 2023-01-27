import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import ArticleFeature from '../../../../../components/features/LN-10/article/default';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as cajaTemasValidators from '../../../../../components/private/LN/common/utils/cajaTemasValidators';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Components - features - LN-10 - articulo - default', () => {
    jest.spyOn(cajaTemasValidators, 'validateArticleFeature').mockReturnValue(
        false
    );

    Context.useAppContext = jest.fn(() => ({
        isAdmin: false,
        renderables: [],
        layout: 'LN10-Home_Main',
        arcSite: 'la-nacion-ar'
    }));

    const getProps = variant => ({
        id: 'f0f9g3fKOoHW25c',
        customFields: {
            noteId: '2KOBND62KNFVVBFQZOADNN6WNY',
            imageId: 'asdas',
            videoId: 'asdas',
            mobileImageId: 'asdas',
            lead: 'LeadNota',
            title: 'Nota',
            authors: [],
            variant
        },
        isBomba: false
    });
    it('should test card autor variant', () => {
        useContent.mockReturnValue(article());
        const { container } = render(
            <ArticleFeature {...getProps('author')} />
        );
        expect(container).toMatchSnapshot();
    });
    it('should test card autor to be regular and not show marquee img with more than 2 authors', () => {
        useContent.mockReturnValue(article(['Leuco', 'Leuco JR']));
        const { container } = render(
            <ArticleFeature {...getProps('author')} />
        );
        expect(screen.getByRole('article')).not.toHaveClass('--author');
        expect(container.innerHTML).not.toContain('marquee-img');
    });
    it('should render Cargando...', () => {
        useContent.mockReturnValue(null);

        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        render(<ArticleFeature {...getProps()} />);
        expect(screen.getByText('Cargando...')).toBeDefined();
    });
    it('should render page builder error', () => {
        jest.spyOn(
            cajaTemasValidators,
            'validateArticleFeature'
        ).mockReturnValue({
            message: 'El ID de la nota es incorrecto.'
        });

        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables: [],
            layout: 'LN10-Home_Main',
            arcSite: 'la-nacion-ar'
        }));

        render(<ArticleFeature {...getProps()} />);
        expect(
            screen.getByText('El ID de la nota es incorrecto.')
        ).toBeDefined();
    });
});

const article = authors => ({
    _id: 'BBU3ZCWFBRALRO4FZAHJ5XGW74',
    content_restrictions: { content_code: 'comun' },
    credits: { by: authors },
    display_date: '2021-11-23T20:40:21.467Z',
    headlines: {
        basic:
            'Dejó un puesto gerencial. Se mudó a un pueblo de 800 habitantes y armó un lodge de lujo: “Ganamos una tranquilidad que no tiene precio”',
        mobile: ''
    },
    label: {
        recomendar: { text: 'Si' },
        volanta: { display: true, text: 'Esto es volanta.' }
    },
    promo_items: {
        basic: {
            height: 1333,
            resized_urls: [],
            type: 'image',
            url:
                'https://resizer.glanacion.com/resizer/aPpzwat2vydqHtvHAqbvYMMLNpU=/1920x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/VOALGQSHQFB7FJ4CPM7LR5AICY.jpg',
            width: 2000
        }
    },
    publish_date: '2023-01-23T14:18:54.470Z',
    related_content: { basic: [] },
    subheadlines: { basic: 'Esto es un subhead ' },
    subtype: '4',
    taxonomy: {
        primary_section: {
            _id: '/lifestyle',
            additional_properties: [],
            name: 'Lifestyle',
            path: '/lifestyle'
        },
        tags: []
    },
    website_url:
        '/lifestyle/dejo-un-puesto-gerencial-se-mudo-a-un-pueblo-de-800-habitantes-y-armo-un-lodge-de-lujo-ganamos-una-nid23112021/'
});
