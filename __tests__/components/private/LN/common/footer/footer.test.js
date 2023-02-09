import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import Footer from '../../../../../../components/private/LN/common/footer';
import commonProps from '../../../../../../components/private/LN/common/footer/helpers/commonProps';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});
jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = { outputType: 'amp' };

        return props.children(mockAvailableProps);
    }
}));

const deployment = (deploymentValue = 'lanacion.com.ar') => deploymentValue;

describe('Components- Private - footer - index.jsx - test', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment
    }));
    const mockDate = new Date(2023, 6, 1);
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    it('Should match snapshot showing all the private components', () => {
        const { container } = render(<Footer />);
        expect(container).toMatchSnapshot();
    });
});

describe('Components- footer - helper - commonProps.js - test', () => {
    it('should return an object that owns the parameters passed to the function', () => {
        const createObject = commonProps(
            'Máster en periodismo',
            'Ir a la Maestría en periodismo',
            'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
            '_blank'
        );
        expect(createObject).toEqual({
            text: 'Máster en periodismo',
            alt: 'Ir a la Maestría en periodismo',
            href:
                'https://www.utdt.edu/ver_contenido.php?id_contenido=1111&id_item_menu=2327',
            target: '_blank'
        });
    });
    it('should return an object with the correct parameters', () => {
        const createObject = commonProps(
            'Opinión',
            'Ir a Opinión',
            'https://www.lanacion.com.ar/opinion/'
        );
        expect(createObject).toEqual({
            text: 'Opinión',
            alt: 'Ir a Opinión',
            href: 'https://www.lanacion.com.ar/opinion/'
        });
    });
});
