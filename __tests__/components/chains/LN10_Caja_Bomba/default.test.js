import React from 'react';
import CajaBomba from '../../../../components/chains/LN10_Caja_Bomba/default';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderables from '../../../../__mocks__/data/renderables/LN10_Caja_Bomba.json';
import ArticleFeature from '../../../../components/features/LN-10/article/default';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/features/LN-10/article/default',
    () => 'mocked-ArticleFeature'
);

describe('Tests - Chain - CajaBomba', () => {
    const articleFeature = <ArticleFeature id="noteId" />;

    const getProps = (layout, children, isAdmin = true) => ({
        id: 'c0f1M2nf284vbpr',
        isAdmin,
        customFields: { layout, hideCaja: false },
        children,
        renderables
    });

    describe('Tests when the component is rendering in page Builder', () => {
        test('It should return an alert when the layout is "bombita + 4" and the number of articles is less than 5', () => {
            render(
                <CajaBomba {...getProps('bombitaMas4', [articleFeature])} />
            );

            expect(screen.getByText('Advertencia')).toBeDefined();

            expect(
                screen.getByText(
                    'La diagramacion Bombita + 4 requiere 5 articulos. Faltan 4 articulos'
                )
            ).toBeDefined();
        });

        const casesThatRequireOneArticle = [
            [
                'should return a warning that 1 item is required when the layout is "vertical"',
                getProps('vertical', [articleFeature, articleFeature])
            ],
            [
                'should return a warning that 1 item is required when the layout is "Bombita"',
                getProps('Bombita', [articleFeature, articleFeature])
            ],
            [
                'should return a warning that 1 item is required when the layout is "horizontal"',
                getProps('horizontal', [articleFeature, articleFeature])
            ]
        ];

        test.each(casesThatRequireOneArticle)('%s', (message, props) => {
            render(<CajaBomba {...props} />);
            expect(screen.getByText('Advertencia')).toBeDefined();

            expect(
                screen.getByText('Esta diagramacion admite solo 1 articulo')
            ).toBeDefined();
        });
    });

    describe('Tests when the component is rendering outside of Page Builder', () => {
        const casesWhenPublishWithAWarning = [
            [
                'should not return a bomb when there is more than one item and the design is "vertical"',
                getProps('vertical', [articleFeature, articleFeature], false)
            ],
            [
                'should not return a bomb when there is more than one item and the design is "Bombita"',
                getProps('Bombita', [articleFeature, articleFeature], false)
            ],
            [
                'should not return a bomb when there is more than one item and the design is "horizontal"',
                getProps('horizontal', [articleFeature, articleFeature], false)
            ],
            [
                'should not return a bomb when the layout is "bombita + 4" and the number of articles is less than 5',
                getProps('bombitaMas4', [articleFeature, articleFeature])
            ]
        ];

        test.each(casesWhenPublishWithAWarning)('%s', (message, props) => {
            const { container } = render(<CajaBomba {...props} />);
            expect(container.querySelector('.bomba')).toBeNull();
        });

        test('Should return a wrapper with the class "bombitaMas4" and 5 articles.', () => {
            const { container } = render(
                <CajaBomba
                    {...getProps(
                        'bombitaMas4',
                        [
                            articleFeature,
                            articleFeature,
                            articleFeature,
                            articleFeature,
                            articleFeature
                        ],
                        false
                    )}
                />
            );

            const wrapperBomba = container.querySelector('.mas-4');

            expect(wrapperBomba).toBeDefined();
            expect(
                wrapperBomba.querySelectorAll('mocked-ArticleFeature')
            ).toHaveLength(5);
        });

        test('Should return a wrapper with the class "vertical" and 5 articles.', () => {
            const { container } = render(
                <CajaBomba {...getProps('vertical', [articleFeature], false)} />
            );

            const wrapperBomba = container.querySelector('.vertical');

            expect(wrapperBomba).toBeDefined();
            expect(
                wrapperBomba.querySelectorAll('mocked-ArticleFeature')
            ).toHaveLength(1);
        });

        test('Should return a wrapper with the class "horizontal" and 5 articles.', () => {
            const { container } = render(
                <CajaBomba
                    {...getProps('horizontal', [articleFeature], false)}
                />
            );

            const wrapperBomba = container.querySelector('.horizontal');

            expect(wrapperBomba).toBeDefined();
            expect(
                wrapperBomba.querySelectorAll('mocked-ArticleFeature')
            ).toHaveLength(1);
        });

        test('Should return a wrapper with the class "bombita" and 5 articles.', () => {
            const { container } = render(
                <CajaBomba {...getProps('bombita', [articleFeature], false)} />
            );

            const wrapperBomba = container.querySelector('.bombita');

            expect(wrapperBomba).toBeDefined();
            expect(
                wrapperBomba.querySelectorAll('mocked-ArticleFeature')
            ).toHaveLength(1);
        });
    });
});
