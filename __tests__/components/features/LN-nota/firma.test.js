import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FirmaFeature from '../../../../components/features/LN-nota/firma';
import getAuthorByline from '../../../../components/private/common/utils/getAuthorByline';
import { getPropsBuilderFromContentElements } from '../../../../components/private/common/utils/firmaHelper';
import { compose } from '../../../../components/private/common/utils/functional';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

describe('Firma Feature', () => {
    const globalContent = {
        credits: {
            by: [
                {
                    type: 'author',
                    name: 'Mariano Grondona',
                    image: {
                        url:
                            'https://bucket.glanacion.com/anexos/fotos/85/2089285.png',
                        version: '0.5.8'
                    },
                    slug: 'mariano-grondona',
                    additional_properties: {
                        original: {
                            author_type: 'Estándar',
                            byline: 'Mariano Grondona',
                            role: 'LA NACION'
                        }
                    }
                },
                {
                    type: 'author',
                    name: 'Cristóbal Bellolio Badiola',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/lanacionar/c780bba1-6787-49f6-86ff-50afad490094.webp',
                        version: '0.5.8'
                    },
                    url: '/autor/cristobal-bellolio-badiola-13185/',
                    slug: 'cristobal-bellolio-badiola-13185',
                    additional_properties: {
                        author_type: ''
                    }
                }
            ]
        },
        distributor: {
            name: 'LA NACION'
        },
        withFirmaDistributor: false
    };

    beforeEach(() => {
        render(
            <FirmaFeature
                outputType={'default'}
                customFields={{ position: 'Top' }}
                globalContent={globalContent}
            />
        );
    });

    it('Sub-components exist', () => {
        const autores = screen.queryAllByText(/.*/, {
            selector: '.com-text.--autor'
        });
        expect(autores).toHaveLength(2); // Verifica que hay dos elementos que representan a los autores
    });

    it('Construct props properly', () => {
        // La configuración de renderización ya se hizo en beforeEach
        const autorElements = screen.getAllByText(/.*/, {
            selector: '.com-text.--autor'
        });
        expect(autorElements).toHaveLength(2);
    });
});

describe('Funcion Get Author Byline', () => {
    it('Deberia traer la propiedad byline sobre el nombre del autor', () => {
        let author = {
            type: 'author',
            name: 'Mariano Grondona',
            additional_properties: {
                original: {
                    author_type: 'Estándar',
                    byline: 'Mariano Grondona 1'
                }
            }
        };

        expect(getAuthorByline(author)).toEqual('Mariano Grondona 1');
        expect(getAuthorByline(author)).toEqual('Mariano Grondona 1');

        author.additional_properties = {};
        expect(getAuthorByline(author)).toEqual('Mariano Grondona');

        author = {};
        expect(getAuthorByline(author)).toEqual('');
    });
});

describe('Prueba de retorno funcion getPropsBuilderFromContentElements', () => {
    const contentElements = [
        {
            _id: 'X4X7HVRVOVGFVAWILZ7YUPKG6A',
            additional_properties: {},
            content: 'Cuerpo de infografía.',
            type: 'text'
        },
        {
            _id: '6EHKP25ACZCJZADQIZRHK6ERAM',
            additional_properties: {},
            content: '1',
            type: 'text'
        },
        {
            _id: 'L5GYSB2AOJHOLHOUS4UCJOWUUU',
            additional_properties: {},
            content: '2',
            type: 'text'
        },
        {
            _id: 'BJIQZVIOQ5BLBANA45GNJSP3JY',
            additional_properties: {},
            content: '3',
            type: 'text'
        }
    ];

    it('Retorno para position Top', () => {
        expect(
            getPropsBuilderFromContentElements('Top')(contentElements)
        ).toStrictEqual({ authors: [], photo: null, medio: null });
    });

    it('Test de retorno para position Bottom', () => {
        const construcProps = getPropsBuilderFromContentElements('Bottom');
        expect(compose(construcProps)(contentElements)).toStrictEqual({});
    });
});

describe('Test de renderizado condicional en FirmaFeature', () => {
    const props = {
        customFields: { position: 'Top' },
        globalContent: {
            content_elements: [],
            credits: { by: [] },
            distributor: undefined,
            withFirmaDistributor: true
        }
    };
    it('Test return de ComPartner', () => {
        render(<FirmaFeature {...props} />);
        const comPartnerElement = screen.getByText('LA NACION', {
            exact: false
        });
        expect(comPartnerElement).toBeInTheDocument();
    });
    it('Test return de ComLink', () => {
        const properties = {
            ...props,
            globalContent: {
                ...props.globalContent,
                distributor: { name: 'reuters' }
            }
        };
        render(<FirmaFeature {...properties} />);

        // Buscamos el elemento 'a' dentro del cual debería estar el ComLink
        const linkElement = screen.getByRole('link');

        // Verificamos que el enlace tenga la clase 'com-link'
        expect(linkElement).toHaveClass('com-link');

        // Verificamos que el enlace tenga el atributo 'href' correcto
        expect(linkElement).toHaveAttribute(
            'href',
            'undefined/distributor/reuters/'
        );

        // Buscamos el elemento 'span' dentro del cual debería estar el texto 'reuters'
        const comPartnerElement = screen.getByText('reuters', {
            exact: false
        });

        // Verificamos que el elemento 'span' tenga la clase '--twoxs'
        expect(comPartnerElement).toHaveClass('--twoxs');
    });
});

describe('Early return test in FirmaFeature', () => {
    const props = {
        customFields: { position: 'Top' },
        globalContent: {
            content_elements: [],
            credits: { by: [] },
            distributor: { name: 'lanacionar' },
            withFirmaDistributor: true
        }
    };
    it('if the distributor name is "lanacionar", null should be returned', () => {
        const { container } = render(<FirmaFeature {...props} />);
        expect(container.firstChild).toBeNull();
    });

    it('if the distributor name is not "lanacionar", it should render correctly', () => {
        const copyProps = {
            ...props,
            globalContent: {
                ...props.globalContent,
                distributor: { name: 'reuters' }
            }
        };

        const { container } = render(<FirmaFeature {...copyProps} />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
