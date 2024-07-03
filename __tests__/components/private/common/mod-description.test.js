import React from 'react';
import { render, screen } from '@testing-library/react';
import ModDescription from '../../../../components/private/common/mod-description';
import Context from 'fusion:context';

jest.mock(
    '../../../../components/private/common/com-title.jsx',
    () => props => <div data-testid="com-title-mock" {...props} />
);
jest.mock('../../../../components/private/common/com-date.jsx', () => props => (
    <div data-testid="com-date-mock" {...props} />
));
jest.mock(
    '../../../../components/private/common/text/index.jsx',
    () => props => <div data-testid="text-mock" {...props} />
);
jest.mock('../../../../components/private/common/com-tag.jsx', () => props => (
    <div data-testid="com-tag-mock" {...props} />
));

jest.mock(
    '../../../../components/private/common/badge/Badge.jsx',
    () => props => <div data-testid="com-badge-mock" {...props} />
);

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Private - Common - ModDescription', () => {
    const props = {
        link: 'http://google.com',
        titleTag: 'h1',
        titleSize: '--s',
        titleText: 'Este es el titulo',
        titleWeight: '--font-bold',
        authors: ['Mariano Grondona'],
        subheadText: 'Este es el subtitulo',
        subheadSize: '',
        authorSize: '',
        subheadTag: '',
        dateText: '2020-06-02T15:28:04.694Z',
        label: { style: '', text: '' },
        lead: undefined,
        dateSize: '',
        marquesina: 'Por Carlos Pagni',
        category: { name: 'Comunidad', path: '/comunidad' },
        contentRestrictions: {
            content_code: 'comun'
        },
        tags: [
            { text: 'Educación', slug: 'educacion-123' },
            { text: 'Inclusión', slug: 'inclusion-123' },
            { text: 'Sociedad', slug: 'sociedad-123' }
        ],
        dataAuthors: undefined,
        categoryNote: ''
    };

    Context.useAppContext = jest.fn(() => ({
        layout: 'LN-Home_Main'
    }));

    it('Should render', () => {
        render(<ModDescription {...props} />);
        expect(screen.getByTestId('com-title-mock')).toBeInTheDocument();
    });

    it('Should sent props correctly', () => {
        render(<ModDescription {...props} />);
        const titleComponent = screen.getByTestId('com-title-mock');
        expect(titleComponent).toHaveAttribute('content', 'Este es el titulo');
        expect(titleComponent).toHaveAttribute('link', 'http://google.com');
        expect(titleComponent).toHaveAttribute('tag', 'h1');
        expect(titleComponent).toHaveAttribute('weight', '--font-bold');
    });

    it('Should render HTML attributes correctly', () => {
        render(<ModDescription {...props} />);
        expect(screen.getByTestId('com-title-mock')).toBeInTheDocument();

        const textMocks = screen.getAllByTestId('text-mock');
        expect(textMocks).toHaveLength(2);
        expect(textMocks[0]).toHaveAttribute('text', 'Este es el subtitulo');
        expect(textMocks[1]).toHaveAttribute('text', 'Por Carlos Pagni');

        const tags = screen.getAllByTestId('com-tag-mock');
        const expectedContents = [
            'Comunidad',
            'Educación',
            'Inclusión',
            'Sociedad'
        ];
        expectedContents.forEach(content => {
            expect(
                tags.some(tag => tag.getAttribute('content') === content)
            ).toBeTruthy();
        });
    });

    it('ModDescription - Snapshots', () => {
        const { asFragment } = render(<ModDescription {...props} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
