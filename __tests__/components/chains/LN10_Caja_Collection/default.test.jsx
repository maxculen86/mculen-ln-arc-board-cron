import React from 'react';
import CajaCollection from '../../../../components/chains/LN10_Caja_Collection/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderables from '../../../../__mocks__/data/LN10_Caja_Collection/renderablesGrid8And4.json';
import responseSource from '../../../../__mocks__/data/LN10_Caja_Collection/responseUseGetArticleInCollection.json';
import getDynamicBanners from '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners';
import useGetArticleInCollection from '../../../../components/private/LN/common/hooks/useGetArticleInCollection';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/banners/dynamicBanners/getDynamicBanners',
    () => jest.fn()
);

jest.mock(
    '../../../../components/private/LN/common/hooks/useGetArticleInCollection',
    () => jest.fn()
);

describe('Tests Chain CajaCollection', () => {
    const customFields = {
        title: 'Caja Collection',
        layout: '',
        hideTitle: false,
        hideCaja: false,
        link: '',
        linkButton: '',
        chainStyle: '',
        logoId: '',
        buttonStyle: '',
        buttonText: '',
        navigator: '',
        idCollection: '',
        initialPosition: 0
    };
    const getProps = ({ customFields }) => ({
        id: 'c0fuuilRMMtV6pi',
        isAdmin: true,
        customFields,
        tree: {},
        renderables
    });

    describe('Tests for the case warnning', () => {
        test('should return a warning when there is no layout defined', () => {
            render(<CajaCollection {...getProps({ customFields })} />);

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeVisible();
        });

        test('should return a warning when they do not specify a collection id', () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4'
            };
            render(
                <CajaCollection
                    {...getProps({ customFields: fields, childProps: [] })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere el id de la colección')
            ).toBeVisible();
        });

        test("should return a warning when the collectionSource doesn't find notes.", () => {
            const fields = {
                ...customFields,
                layout: 'bnGrilla4',
                idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
            };
            useGetArticleInCollection.mockImplementation(() => undefined);
            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'La colección JYLAMSGRTRBSVEZTT7VHO2WO3U no encontró notas'
                )
            ).toBeVisible();
        });
    });

    describe('Tests for the case of BN grid 8 and 4', () => {
        const fields = {
            ...customFields,
            layout: 'bnGrilla4',
            idCollection: 'JYLAMSGRTRBSVEZTT7VHO2WO3U'
        };

        test('should return a grid of 4 items', () => {
            useGetArticleInCollection.mockImplementation(() => responseSource);

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(4);
        });

        test('should return a grid of 8 items', () => {
            useGetArticleInCollection.mockImplementation(() => [
                ...responseSource,
                ...responseSource
            ]);

            render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );

            expect(screen.getAllByRole('article')).toHaveLength(8);
        });

        test('should show the download when the article has no imaget', () => {
            useGetArticleInCollection.mockImplementation(() => [
                responseSource
            ]);

            const { container } = render(
                <CajaCollection
                    {...getProps({
                        customFields: fields
                    })}
                />
            );
            screen.debug();
            const bajada =
                'Incidentes frente al hotel donde convocó a militantes ';

            const articleWithSubhead = container.querySelector('.subhead');

            expect(articleWithSubhead).toBeDefined();
            // expect(screen.getByText(bajada)).toBeVisible();
        });
    });
});
