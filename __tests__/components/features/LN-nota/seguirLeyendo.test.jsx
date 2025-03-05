import React from 'react';
import { render, screen } from '@testing-library/react';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { useAppContext } from 'fusion:context';
import { articleBoxesTracker } from '../../../../components/private/common/utils/noteTracker/articleBoxesTracker';
import SeguirLeyendo from '../../../../components/features/LN-nota/seguirLeyendo';

jest.mock('fusion:content');
jest.mock('fusion:context');
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
        useAppContext.mockReturnValue({ arcSite: 'la-nacion-ar' });
        useContent.mockReturnValue([
            {
                headlines: {
                    basic: 'Los desarrolladores ponen la mira en la zona de Canning'
                }
            },
            {
                headlines: {
                    basic: 'Las prótesis mamarias no pagan el 30% al dólar'
                }
            }
        ]);

        render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ'
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
        useAppContext.mockReturnValue({ arcSite: 'la-nacion-ar' });
        useContent.mockReturnValue([]);

        const { container } = render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ'
                }}
                outputType="default"
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('should call articleBoxesTracker when mounting the component', () => {
        useAppContext.mockReturnValue({ arcSite: 'la-nacion-ar' });
        useContent.mockReturnValue([
            {
                headlines: {
                    basic: 'Aseguran haber hallado la casa donde Jesús pasó su infancia: cómo es por dentro'
                }
            }
        ]);

        render(
            <SeguirLeyendo
                globalContent={{
                    _id: 'XL4ECIXVXFDPHMKFC3GBVG5IOQ'
                }}
                outputType="default"
            />
        );

        expect(articleBoxesTracker).toHaveBeenCalledWith({
            boxType: 'seguirLeyendo'
        });
    });
});
