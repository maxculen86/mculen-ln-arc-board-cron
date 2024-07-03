import Consumer from 'fusion:consumer';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import ModArticle from '../../../../components/private/common/mod-article';
import article from '../../../../__mocks__/data/articles/articleAcum.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

describe('Private - Common - ModArticle', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    const authors = ['Mariano Grondona'];

    const props = {
        anexo: undefined,
        artPosition: undefined,
        articleData: article,
        dataSection: '',
        classCondition: '',
        withMedia: true,
        link: 'http://google.com',
        titleTag: 'h1',
        titleSize: '--s',
        titleText: 'Este es el titulo',
        titleWeight: '',
        authors: authors,
        authorSize: undefined,
        leadText: undefined,
        mobileImage: undefined,
        noMedia: undefined,
        registerSuccessEvent: undefined,
        searchableField: undefined,
        boxPosition: undefined,
        dateText: '2020-06-02T15:28:04.694Z',
        device: 'desktop',
        handleClick: undefined,
        dateSize: '',
        subheadText: 'Este es el subtitulo',
        videoBackground: undefined,
        subheadSize: '2xs',
        subheadTag: 'h3',
        outputType: 'default',
        label: 'chapita',
        layout: '',
        category: '',
        tags: [],
        hour: '',
        isPowa: true,
        isRenderAuthor: false,
        isRenderAuthorOpinion: false,
        isApertura: false,
        typeArticle: ''
    };

    it('Should render ModArticle component', () => {
        render(<ModArticle {...props} />);
        const titleElement = screen.getByText('Este es el titulo');
        const linkElement = screen.getByRole('link', {
            name: 'Este es el titulo'
        });

        expect(titleElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', 'http://google.com');
    });

    it('Should sent props correctly', () => {
        render(<ModArticle {...props} />);
        expect(screen.getByText('Este es el titulo')).toBeInTheDocument();
        expect(screen.getByText('Este es el subtitulo')).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Este es el titulo' })
        ).toHaveAttribute('href', 'http://google.com');
    });

    it('Should render HTML attributes correctly', () => {
        render(<ModArticle {...props} />);
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByRole('article')).toHaveClass('mod-article');
        expect(screen.getByText('Este es el subtitulo')).toBeInTheDocument();
        expect(screen.getByText('Mariano Grondona')).toBeInTheDocument();
        expect(screen.getByText('2 de junio de 2020')).toBeInTheDocument();
    });

    it('ModArticle - Snapshots', () => {
        const { asFragment } = render(<ModArticle {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
