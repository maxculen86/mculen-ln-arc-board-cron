import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import wikiTagPersona from '../../../../__mocks__/data/wikiTag/wikiTagPersona.json';

import WikiFeature, {
    getAltImg,
    getIconHref,
    getIconTitle
} from '../../../../components/features/LN-acumulado/wiki/default';
import mockWikiTagData from '../../../../__mocks__/data/wikiTag/wikiTagData.json';

jest.mock(
    '../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};
        return props.children(mockAvailableProps);
    },
    useAppContext: jest.fn(() => ({}))
}));

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('LN-Acumulado-WikiTag test', () => {
    it('Should render the feture when isWiki is true', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true,
                wikiSourceData: wikiTagPersona
            }
        }));
        const { container } = render(<WikiFeature />);

        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(5);
        expect(
            container.getElementsByClassName('description')
        ).toMatchSnapshot();
    });
    it('Should not render when isWiki is false', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: false
            }
        }));
        const { container } = render(<WikiFeature />);
        expect(container).toMatchInlineSnapshot('<div />');
    });
    it('should test getAltImg func', () => {
        expect(getAltImg(true, '', '', '', 'River Plate')).toStrictEqual(
            'River Plate'
        );
        expect(
            getAltImg(false, 'Diego', 'Armando', 'Maradona', '')
        ).toStrictEqual('Diego Armando Maradona');
    });

    it('should test getIconTitle func', () => {
        expect(
            getIconTitle(true, 'Facebook', 'Boca Juniors', '', '')
        ).toStrictEqual('Ir al Facebook de Boca Juniors');
        expect(
            getIconTitle(false, 'Facebook', '', 'Susana', 'Gimenez')
        ).toStrictEqual('Ir al Facebook de Susana Gimenez');
    });
    it('should test getIconHref func', () => {
        expect(
            getIconHref('Instagram', 'instagram.com/leomessi')
        ).toStrictEqual('instagram.com/leomessi/');
        expect(getIconHref('Facebook', 'facebook.com/leomessi')).toStrictEqual(
            'facebook.com/leomessi'
        );
    });
    it('When sotialNetworks is empty', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true,
                wikiSourceData: mockWikiTagData
            }
        }));
        const { container } = render(<WikiFeature />);

        expect(
            screen.getByText(
                (content, element) =>
                    element.tagName.toLowerCase() === 'mock-static-validation'
            )
        ).toBeVisible();
        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(7);
        expect(container.innerHTML.includes('<div class="social-icons')).toBe(
            false
        );
        expect(
            container.getElementsByClassName('description')
        ).toMatchSnapshot();
    });
});
