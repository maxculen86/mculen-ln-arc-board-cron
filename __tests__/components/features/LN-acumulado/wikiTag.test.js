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
    'fusion:context',
    () => {
        const context = {
            useAppContext: jest.fn(() => ({}))
        };

        return {
            __esModule: true,
            default: context,
            get useAppContext() {
                return context.useAppContext;
            }
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:environment',
    () => {
        return {
            RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
            SITE_LANACION: 'https://sandbox.lanacion.com.ar'
        };
    },
    { virtual: true }
);

jest.mock(
    'fusion:properties',
    () => () => ({
        getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
    }),
    { virtual: true }
);

jest.mock(
    'fusion:static',
    () => {
        const React = require('react');

        return function Static({ children, ...props }) {
            return React.createElement('static', props, children);
        };
    },
    { virtual: true }
);

describe('LN-Acumulado-WikiTag test', () => {
    it('Should render the feture when isWiki is true', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true,
                wikiSourceData: wikiTagPersona
            }
        }));
        const { container } = render(<WikiFeature />);

        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('img').getAttribute('src')).toContain(
            'https://www.lanacion.com.ar/resizer'
        );
        expect(screen.getByRole('img').getAttribute('src')).not.toContain(
            'https://sandbox.lanacion.com.ar/resizer'
        );
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
