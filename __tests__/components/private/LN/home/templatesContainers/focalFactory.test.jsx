import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FocalFactory from '../../../../../../components/private/LN/home/templatesContainers/focalFactory';

const props = {
    boxPosition: '01',
    _children: [['f0fj1U7I4DQq82U'], ['f0fj1U7I4DQq821'], ['f0fj1U7I4DQq822']],
    directionFocal: 'focalLeft3'
};

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({
        cajaTemaConfig: {
            focalLeft3: {
                className: '--focal --left',
                articles: {
                    '0': {
                        titleSize: '--xl',
                        titleTagApertura: 'h1',
                        subheadTagApertura: 'h2',
                        withSubheadAndMedia: true,
                        withSubhead: true,
                        imageConfig: 'featuredFocalIzquierdo',
                        isApertura: true
                    },
                    '1': {
                        titleSize: '--xs',
                        withSubheadAndMedia: false,
                        imageConfig: 'mediumFocalIzquierdo'
                    },
                    '2': {
                        titleSize: '--xs',
                        withSubheadAndMedia: false,
                        imageConfig: 'mediumFocalIzquierdo'
                    }
                }
            },
            focalRight2: {
                className: '--focal --right',
                articles: {
                    '0': {
                        titleSize: '--l',
                        withSubheadAndMedia: true,
                        imageConfig: 'featuredFocalDerecho'
                    },
                    '1': {
                        titleSize: '--xl',
                        titleTagApertura: 'h1',
                        subheadTagApertura: 'h2',
                        withSubheadAndMedia: true,
                        imageConfig: 'mediumFocalDerecho',
                        withSubhead: true,
                        isApertura: true
                    }
                }
            }
        },
        layoutsName: {
            Home: 'LN-Home_Main',
            Acumulado: 'LN-acumulado'
        }
    })
}));

describe('components - private - LN - home - templatesContainers - focalFactory', () => {
    describe('focalFactory render tests', () => {
        describe('When directionFocal is focalLeft3', () => {
            test('when it hasnt articles return null', () => {
                const { container } = render(
                    <FocalFactory props={{ ...props, _children: [] }} />
                );
                expect(container).toBeEmptyDOMElement();
            });
            test('when it has articles return focal 3 diagramation', () => {
                const { container } = render(<FocalFactory {...props} />);
                expect(container).toMatchSnapshot();
            });
        });

        describe('When directionFocal is focalRight2', () => {
            test('return focal 2 diagramation', () => {
                const { container } = render(
                    <FocalFactory
                        directionFocal="focalRight2"
                        _children={[
                            ['f0fj1U7I4DQq82U'],
                            ['f0fj1U7I4DQq821'],
                            ['f0fj1U7I4DQq822']
                        ]}
                        boxPosition="01"
                    />
                );

                expect(container).toMatchSnapshot();
            });
        });
    });
});
