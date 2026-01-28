import React from 'react';
import { render, screen } from '@testing-library/react';
import Signature from '../../../../../../components/features/LN-nota/footer/_children/signature';
import { useSignature } from '../../../../../../components/features/LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../../../components/private/common/audioNews/helpers';

jest.mock(
    '../../../../../../components/features/LN/DS-Signature/hooks/useSignature',
    () => ({
        useSignature: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/common/audioNews/helpers',
    () => ({
        getAuthorsNameAndLink: jest.fn()
    })
);

describe('components - feature - LN-nota - footer - _children - signature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not render anything if there are no authors and the distributor signature is not shown', () => {
        useSignature.mockReturnValue({ medio: '', authors: [] });
        getAuthorsNameAndLink.mockReturnValue({ author: null });

        const { container } = render(
            <Signature
                globalContent={{
                    credits: { by: [] },
                    distributor: { name: 'lanacionar' }
                }}
            />
        );

        expect(container.firstChild).toBeNull();
    });

    it('renders the distributor signature if enabled', () => {
        useSignature.mockReturnValue({ medio: '', authors: [] });
        getAuthorsNameAndLink.mockReturnValue({ author: null });

        render(
            <Signature
                globalContent={{
                    withFirmaDistributor: true,
                    distributor: { name: 'The New York Times' },
                    credits: { by: [] }
                }}
            />
        );

        expect(screen.getByText('The New York Times')).toBeInTheDocument();
    });

    it('renders with author signature', () => {
        useSignature.mockReturnValue({
            medio: 'LA NACION',
            authors: [
                {
                    name: 'Mariano Grondona',
                    url: '/autor/mariano-grondona-1/'
                }
            ]
        });

        const defaultProps = {
            globalContent: {
                _id: 'DZWJ2VUZDBGM3LTZPSPTHCMJ2A',
                credits: {
                    by: [
                        {
                            name: 'Mariano Grondona',
                            _id: 'mariano-grondona',
                            additional_properties: {
                                original: {
                                    byline: 'Mariano Grondona',
                                    firstName: 'Mariano',
                                    lastName: 'Grondona',
                                    author_type: 'Estándar',
                                    email: '',
                                    image: 'https://bucket.glanacion.com/anexos/fotos/85/2089285.png',
                                    status: true,
                                    role: 'LA NACION',
                                    longBio:
                                        'Periodista desde hace más de cuarenta años, es conductor del programa televisivo Hora Clave desde 1989 y columnistas de temas políticos en el diario LA NACION. Es abogado y realizó estudios de sociología en la Universidad de Madrid y de Ciencia Política en el Instituto de Estudios Políticos de la misma ciudad española. Profesor adjunto de Derecho Político en la UBA hasta 1987 y titular de Teoría del Estado entre ese año y 1999, fue académico y profesor visitante e investigador asociado en la Universidad de Harvard, y enseña actualmente en la Universidad CEMA. Además, es autor de varios libros, entre ellos Los pensadores de la Libertad, Bajo el imperio de las ideas morales, La Corrupción, La Argentina como vocación, y Las condiciones culturales del desarrollo económico.',
                                    slug: 'mariano-grondona',
                                    last_updated_date:
                                        '2019-05-06T14:22:12.055Z'
                                }
                            },
                            type: 'author',
                            url: '/autor/mariano-grondona-1/'
                        }
                    ]
                },
                withFirmaDistributor: false,
                distributor: {
                    name: 'LA NACION'
                },
                content_elements: []
            }
        };
        const { asFragment } = render(<Signature {...defaultProps} />);

        expect(screen.getByText('Mariano Grondona')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});
