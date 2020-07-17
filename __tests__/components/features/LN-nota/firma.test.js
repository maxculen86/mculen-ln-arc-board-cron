import React from 'react';
import { mount, shallow } from 'enzyme';

jest.mock('fusion:context', Component => {
    return function(Component) {
        const outputType = 'default';
        const credits = {
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
        };

        return props => (
            <Component
                {...props}
                outputType={outputType}
                customFields={{ position: 'Top' }}
                globalContent={{
                    credits
                }}
            />
        );
    };
});

import Context from 'fusion:context';

import FirmaFeature from '../../../../components/features/LN-nota/firma';
import Firma from '../../../../components/private/LN/nota/firma';
import getAuthorByline from '../../../../components/private/common/utils/getAuthorByline';

describe('Firma Feature', () => {
    it('Construct props properly', () => {
        const component = mount(<FirmaFeature />);

        const firma = component.find(Firma).first();

        expect(firma.prop('authors')).toHaveLength(2);
        expect(firma.prop('photo')).toBeNull();
        expect(firma.prop('medio')).toBeNull();
        expect(firma.prop('amp')).toBeFalsy();
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
