import React from 'react';
import Context from 'fusion:context';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModCategory from '../../../../components/private/common/mod-category';
import useGetLogoImage from '../../../../components/private/common/hooks/useGetLogoImage';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../components/private/common/hooks/useGetLogoImage', () =>
    jest.fn()
);

jest.mock(
    '../../../../components/private/common/utils/image/resizer/v2/resizerHelper',
    () => {
        const replaceUrlResizerToWWW = jest.fn(image => ({
            ...image,
            url: 'https://sandbox.lanacion.com.ar/mock-www-url.jpeg',
            resized_urls: [
                {
                    resizedUrl:
                        'https://sandbox.lanacion.com.ar/mock-www-resized.jpeg',
                    option: { width: 200, height: 150 }
                }
            ]
        }));

        return {
            __esModule: true,
            default: replaceUrlResizerToWWW,
            replaceUrlResizerToWWW
        };
    }
);

jest.mock(
    '../../../../components/private/common/social-network',
    () =>
        ({ href, icon, name }) => (
            <a
                href={href}
                title={`Ir a ${name}`}
                data-testid={`social-${icon}`}
            >
                <span>{icon}</span>
            </a>
        )
);

describe('components - private - common - mod-category', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    const socials = [
        {
            name: 'Instagram',
            href: 'https://instagram.com/lanacion',
            icon: 'instagram'
        },
        {
            name: 'TikTok',
            href: 'https://tiktok.com/@lanacion',
            icon: 'tiktok'
        },
        {
            name: 'WhatsApp',
            href: 'https://wa.me/541234567890',
            icon: 'whatsapp'
        }
    ];

    const props = {
        revista: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        imageId: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        category: 'Economía',
        style: {
            color: '#d83e2c'
        },
        navigation: [
            {
                key: 'link-E7JA39MVEN0QQC4TM0UVGEM6JW',
                link: 'https://www.lanacion.com.ar/dolar-hoy/',
                textname: 'Dólar hoy',
                title: 'Ir a Dólar hoy',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-2HHC4226W90FBE7W248NEFNDVC',
                link: 'https://www.lanacion.com.ar/economia/indices/',
                textname: 'Índices',
                title: 'Ir a Índices',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/campo',
                link: '/economia/campo/',
                textname: 'Campo',
                title: 'Ir a Campo',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/economia/negocios',
                link: '/economia/negocios/',
                textname: 'Negocios',
                title: 'Ir a Negocios',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: 'link-HBNZD3H8FH1516540X8ZY6WY8G',
                link: 'https://www.lanacion.com.ar/tema/emprendedores-tid53673/',
                textname: 'Emprendedores',
                title: 'Ir a Emprendedores',
                style: {
                    color: '#d83e2c'
                }
            },
            {
                key: '/propiedades',
                link: '/propiedades/',
                textname: 'Propiedades',
                title: 'Ir a Propiedades',
                style: {
                    color: '#d83e2c'
                }
            }
        ],
        outputType: 'default',
        url: 'https://www.lanacion.com.ar/economia/'
    };

    describe('Mod category snapshot and transformed image URL', () => {
        const imageMock = {
            width: 100,
            height: 100,
            type: 'image',
            url: 'https://resizer.glanacion.com/mock-original.jpeg',
            resized_urls: [
                {
                    resizedUrl:
                        'https://resizer.glanacion.com/mock-original-resized.jpeg',
                    option: { width: 200, height: 150 }
                }
            ],
            caption: 'LA NACION'
        };

        beforeEach(() => {
            useGetLogoImage.mockImplementation(() => imageMock);
        });

        test('Snapshot, attributes, and transformed image URL', () => {
            const { container, getByAltText } = render(
                <ModCategory {...props} />
            );
            expect(container).toMatchSnapshot();

            const img = getByAltText('Economía');
            expect(img).toBeInTheDocument();
            expect(img.getAttribute('src')).toBe(
                'https://sandbox.lanacion.com.ar/mock-www-resized.jpeg'
            );
            expect(img.getAttribute('loading')).toBe('eager');
            expect(img.getAttribute('fetchPriority')).toBe('high');
        });
    });

    describe('should apply css --no-app correctly', () => {
        it('apply --no-app class when sectionId is /juegos', () => {
            const propsWithJuegos = {
                ...props,
                sectionId: '/juegos'
            };

            const { container } = render(<ModCategory {...propsWithJuegos} />);

            const modCategoriesDiv = container.querySelector('.mod-categories');
            expect(modCategoriesDiv).toBeInTheDocument();
            expect(modCategoriesDiv).toHaveClass('mod-categories', '--no-app');
        });

        it('NOT apply --no-app class when sectionId is not /juegos', () => {
            const propsWithOtherSection = {
                ...props,
                sectionId: '/deportes'
            };

            const { container } = render(
                <ModCategory {...propsWithOtherSection} />
            );

            const modCategoriesDiv = container.querySelector('.mod-categories');
            expect(modCategoriesDiv).toBeInTheDocument();
            expect(modCategoriesDiv).toHaveClass('mod-categories');
            expect(modCategoriesDiv).not.toHaveClass('--no-app');
        });

        it('NOT apply --no-app class when sectionId is undefined', () => {
            const propsWithoutSectionId = {
                ...props,
                sectionId: undefined
            };

            const { container } = render(
                <ModCategory {...propsWithoutSectionId} />
            );

            const modCategoriesDiv = container.querySelector('.mod-categories');
            expect(modCategoriesDiv).toBeInTheDocument();
            expect(modCategoriesDiv).toHaveClass('mod-categories');
            expect(modCategoriesDiv).not.toHaveClass('--no-app');
        });
    });

    describe('SocialNetwork rendering', () => {
        it('should not render social networks when socials is undefined', () => {
            const propsWithoutSocials = {
                ...props,
                socials: undefined
            };

            const { queryByTestId } = render(
                <ModCategory {...propsWithoutSocials} />
            );

            expect(queryByTestId('social-instagram')).not.toBeInTheDocument();
        });

        it('should not render social networks when socials is empty array', () => {
            const propsWithEmptySocials = {
                ...props,
                socials: []
            };

            const { queryByTestId } = render(
                <ModCategory {...propsWithEmptySocials} />
            );

            expect(queryByTestId('social-instagram')).not.toBeInTheDocument();
        });

        it('should render single social network (Instagram)', () => {
            const propsWithSocials = {
                ...props,
                socials: [
                    {
                        name: 'Instagram',
                        href: 'https://instagram.com/lanacion',
                        icon: 'instagram'
                    }
                ]
            };

            const { getByTestId } = render(
                <ModCategory {...propsWithSocials} />
            );

            const instagramLink = getByTestId('social-instagram');
            expect(instagramLink).toBeInTheDocument();
            expect(instagramLink.getAttribute('href')).toBe(
                'https://instagram.com/lanacion'
            );
            expect(instagramLink.getAttribute('title')).toBe('Ir a Instagram');
        });

        it('should render multiple social networks (Instagram, TikTok, WhatsApp)', () => {
            const propsWithSocials = {
                ...props,
                socials
            };

            const { getByTestId } = render(
                <ModCategory {...propsWithSocials} />
            );

            const instagramLink = getByTestId('social-instagram');
            const tiktokLink = getByTestId('social-tiktok');
            const whatsappLink = getByTestId('social-whatsapp');

            expect(instagramLink).toBeInTheDocument();
            expect(tiktokLink).toBeInTheDocument();
            expect(whatsappLink).toBeInTheDocument();

            expect(instagramLink.getAttribute('href')).toBe(
                'https://instagram.com/lanacion'
            );
            expect(instagramLink.getAttribute('title')).toBe('Ir a Instagram');

            expect(tiktokLink.getAttribute('href')).toBe(
                'https://tiktok.com/@lanacion'
            );
            expect(tiktokLink.getAttribute('title')).toBe('Ir a TikTok');

            expect(whatsappLink.getAttribute('href')).toBe(
                'https://wa.me/541234567890'
            );
            expect(whatsappLink.getAttribute('title')).toBe('Ir a WhatsApp');
        });

        it('ModCategory - Snapshot with socials', () => {
            const propsWithSocials = {
                ...props,
                socials
            };
            const { asFragment } = render(
                <ModCategory {...propsWithSocials} />
            );
            expect(asFragment()).toMatchSnapshot();
        });
        it('ModCategory - Snapshot without socials', () => {
            const { asFragment } = render(<ModCategory {...props} />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
