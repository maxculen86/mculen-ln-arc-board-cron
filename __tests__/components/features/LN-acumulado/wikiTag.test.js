import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import WikiFeature, {
    getAltImg,
    getIconHref,
    getIconTitle
} from '../../../../components/features/LN-acumulado/wiki/default';
import mockWikiTagData from '../../../../__mocks__/data/wikiTag/wikiTagData.json';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

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

describe('LN-Acumulado-WikiTag test', () => {
    it('Should render the feture when isWiki is true', () => {
        useContent.mockReturnValueOnce(mockWikiTagData);
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                isWiki: true
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
        expect(screen.getAllByRole('link')).toHaveLength(10);
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
});
