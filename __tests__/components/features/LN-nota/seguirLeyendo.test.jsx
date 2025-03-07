import React from 'react';
import Consumer from 'fusion:consumer';
import { render, screen } from '@testing-library/react';
import SeguirLeyendo from '../../../../components/features/LN-nota/seguirLeyendo';
import { articleBoxesTracker } from '../../../../components/private/common/utils/noteTracker/articleBoxesTracker';

jest.mock(
    '../../../../components/private/common/utils/noteTracker/articleBoxesTracker'
);
jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('Components - Features - LN-Nota - seguirLeyendo', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the component with related content', () => {
        render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ',
                    related_content: {
                        basic: [
                            {
                                _id: 'R2CCFG4D6JCOBLK7A73DHEDPAQ',
                                canonical_url:
                                    '/economia/las-protesis-mamarias-no-pagan-el-30-al-dolar-nid16012020/',
                                headlines: {
                                    basic: 'Las prótesis mamarias no pagan el 30% al dólar'
                                }
                            },
                            {
                                _id: 'RVR3C77WONFPLOKRN745LBQR7Q',
                                canonical_url:
                                    '/propiedades/los-desarrolladores-ponen-la-mira-en-la-zona-de-canning-nid20102020/',
                                headlines: {
                                    basic: 'Los desarrolladores ponen la mira en la zona de Canning'
                                }
                            }
                        ]
                    }
                }}
                outputType="default"
            />
        );
        expect(
            screen.getByText(
                'Los desarrolladores ponen la mira en la zona de Canning'
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText('Las prótesis mamarias no pagan el 30% al dólar')
        ).toBeInTheDocument();
    });

    it('should not render anything when it has no related elements', () => {
        const { container } = render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ',
                    related_content: {}
                }}
                outputType="default"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should call articleBoxesTracker when mounting the component', () => {
        render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ',
                    related_content: {
                        basic: [
                            {
                                _id: 'R2CCFG4D6JCOBLK7A73DHEDPAQ',
                                canonical_url:
                                    '/economia/las-protesis-mamarias-no-pagan-el-30-al-dolar-nid16012020/',
                                headlines: {
                                    basic: 'Las prótesis mamarias no pagan el 30% al dólar'
                                }
                            }
                        ]
                    }
                }}
                outputType="default"
            />
        );

        expect(articleBoxesTracker).toHaveBeenCalledWith({
            boxType: 'seguirLeyendo'
        });
    });
});
