import React from 'react';
import { render, screen, queryByAttribute } from '@testing-library/react';
import '@testing-library/jest-dom';
import Consumer from 'fusion:consumer';
import UltimosVideosDeProgramasFeature from '../../../../components/features/OTT/ultimosVideosDeProgramas';
import testHelper from '../../../utils/testHelper';

//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../components/private/OTT/programa/lastVideosByProgram',
    () => 'mock-component'
);

describe('features - OTT - ultimosVideosDeProgramas - Error', () => {
    it('Testeo que de error si no recibe el globalContent', () => {
        expect(() =>
            render(
                <UltimosVideosDeProgramasFeature
                    globalContentConfig={{ source: 'sectionSource' }}
                />
            )
        ).toThrowError();
    });
});

describe('features - OTT - ultimosVideosDeProgramas', () => {
    const sectionId = '/terapia-de-noticias';

    it('Testeo que pase el section id obtenido del name', () => {
        const { container } = render(
            <UltimosVideosDeProgramasFeature
                globalContent={{
                    taxonomy: {
                        sections: [{ name: sectionId }]
                    }
                }}
                globalContentConfig={{ source: 'videoSource' }}
            />
        );
        const getById = queryByAttribute.bind(null, 'sectionid');
        const mockComponent = getById(container, '/terapia-de-noticias');

        expect(mockComponent).toBeInTheDocument();
    });
});
