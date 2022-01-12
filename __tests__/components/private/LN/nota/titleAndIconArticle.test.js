import React from 'react';
import { render } from 'enzyme';
import Context from 'fusion:context';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import TitleArticle from '../../../../../components/private/LN/nota/apertura/titleAndIconArticle';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    }
}));

jest.mock(
    '../../../../../components/private/common/com-logo',
    () => 'com-logo'
);

describe('features - LaNacion - Nota - TituloNota', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' },
        deployment: () => {},
        contextPath: ''
    }));
    const component = render(
        <TitleArticle
            globalContent={nota}
            layout={'LN-nota-noticia'}
            customFields={{ prefix: '' }}
        />
    );
    it('Test de snapshot Titulo e Icono en Nota', () => {
        expect(component).toMatchSnapshot();
    });
});
