import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import nota from '../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';
import notaLinkExterno from '../../../../../__mocks__/data/articles/PUYGVLI4SJH35IYS6J2ZYOWP7E';
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

    it('Snapshot test for Title and Icon in Article', () => {
        const { container } = render(
            <TitleArticle
                globalContent={nota}
                layout={'LN-nota-noticia'}
                customFields={{ prefix: '' }}
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('Snapshot test for Title and Icon in Article with External Link', () => {
        const { container } = render(
            <TitleArticle
                globalContent={notaLinkExterno}
                layout={'LN-nota-noticia'}
                customFields={{ prefix: '' }}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
