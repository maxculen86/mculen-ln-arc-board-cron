import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModCategory from '../../../../components/private/common/mod-category';
import useGetLogoImage from '../../../../components/private/common/hooks/useGetLogoImage';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../components/private/common/hooks/useGetLogoImage', () =>
    jest.fn()
);

describe('components - private - common - mod-category', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: jest.fn(),
        contextPath: '/pf'
    }));
    const props = {
        revista: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        imageId: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        category: 'Economía',
        style: {
            color: '#d83e2c'
        },
        navigation: [
            {
                key: 'link-E7JA39MVEN0QQC4TM0UVGEM6JW',
                link: 'https://www.lanacion.com.ar/dolar-hoy/',
                textname: 'Dólar hoy',
                title: 'Ir a Dólar hoy',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-2HHC4226W90FBE7W248NEFNDVC',
                link: 'https://www.lanacion.com.ar/economia/indices/',
                textname: 'Índices',
                title: 'Ir a Índices',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/campo',
                link: '/economia/campo/',
                textname: 'Campo',
                title: 'Ir a Campo',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/negocios',
                link: '/economia/negocios/',
                textname: 'Negocios',
                title: 'Ir a Negocios',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-HBNZD3H8FH1516540X8ZY6WY8G',
                link:
                    'https://www.lanacion.com.ar/tema/emprendedores-tid53673/',
                textname: 'Emprendedores',
                title: 'Ir a Emprendedores',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/propiedades',
                link: '/propiedades/',
                textname: 'Propiedades',
                title: 'Ir a Propiedades',
                style: {
                    color: '#d83e2c'
                }
            }
        ],
        outputType: 'default',
        url: 'https://www.lanacion.com.ar/economia/'
    };
    describe('Mod category snapshot test', () => {
        const imageMock = {
            width: 100,
            height: 100,
            url: 'https://lanacion.com.ar/mock.jpeg',
            caption: 'LA NACION'
        };

        useGetLogoImage.mockImplementationOnce(() => imageMock);

        const { container } = render(<ModCategory {...props} />);
        test('Snapshot and check values from attributos loading and getchPriority', () => {
            expect(container).toMatchSnapshot();

            const img = container.getElementsByTagName('img');
            expect(img[0].getAttribute('loading')).toBe('eager');
            expect(img[0].getAttribute('fetchPriority')).toBe('high');
        });
    });
});
