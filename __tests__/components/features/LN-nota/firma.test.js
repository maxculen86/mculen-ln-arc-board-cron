import React from 'react';
import { mount } from 'enzyme';
import FirmaFeature from '../../../../components/features/LN-nota/firma';
import ModAutor from '../../../../components/private/common/mod-autor';
import getAuthorByline from '../../../../components/private/common/utils/getAuthorByline';
import { getPropsBuilderFromContentElements } from '../../../../components/private/common/utils/firmaHelper';
import { compose } from '../../../../components/private/common/utils/functional';
import ComPartner from '../../../../components/private/common/com-partner';
import ComLink from '../../../../components/private/common/com-link';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));

jest.mock('fusion:static', () => 'mock-static');

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
    const wrapper = mount(
        <FirmaFeature
            outputType={'default'}
            customFields={{ position: 'Top' }}
            globalContent={globalContent}
        />
    );
    const authorComponent = wrapper.find(ModAutor);
    const staticComponent = wrapper.find('mock-static');

    it('Sub-components exists', () => {
        expect(authorComponent.exists()).toBeTruthy();
        expect(staticComponent.exists()).toBeTruthy();
    });

    it('Construct props properly', () => {
        expect(staticComponent.prop('htmlOnly')).toBeTruthy();
        expect(staticComponent.prop('persistent')).toBeTruthy();

        expect(authorComponent.prop('autor')).toHaveLength(2);
        expect(authorComponent.prop('amp')).toBeFalsy();
        expect(authorComponent.prop('foto')).toBeNull();
        expect(authorComponent.prop('medio')).toBeNull();
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
        const FirmaFeatureComponent = mount(<FirmaFeature {...props} />);
        expect(FirmaFeatureComponent.find(ComPartner).exists()).toBeTruthy();
    });

    it('Test return de ComLink', () => {
        const properties = {
            ...props,
            globalContent: {
                ...props.globalContent,
                distributor: { name: 'lanacionar' }
            }
        };
        const FirmaFeatureComponent = mount(<FirmaFeature {...properties} />);
        expect(FirmaFeatureComponent.find(ComLink).exists()).toBeTruthy();
    });
});
