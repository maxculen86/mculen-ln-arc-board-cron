import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import AnexoFeature, {
    getComponentFromConfig,
    getComponentType
} from '../../../../../components/features/LN-common/anexo/default';
import { isInSection } from '../../../../../components/features/LN-common/anexo/common/_helper-WebApi';
import BuildRoof from '../../../../../components/chains/utils/_BuildRoof/default';
import { setupIntersectionObserver } from '../../../../../components/features/LN-10-global/common/utils/intersectionObserver';
import { isTodayEnabled } from '../../../../../components/chains/LN10_Caja_Segmentada/_helpers';

jest.mock(
    '../../../../../components/features/LN-10-global/common/utils/intersectionObserver'
);

jest.mock(
    '../../../../../components/chains/LN10_Caja_Segmentada/_helpers',
    () => ({
        isTodayEnabled: jest.fn(() => true)
    })
);

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

const defaultContextValue = {
    deployment: arg => arg,
    contextPath: '/pf',
    isAdmin: false,
    layout: ''
};

beforeEach(() => {
    Context.useAppContext = jest.fn(() => ({ ...defaultContextValue }));
});

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../../components/features/LN-common/anexo/common/_helper-WebApi.js',
    () => ({
        ...jest.requireActual(
            '../../../../../components/features/LN-common/anexo/common/_helper-WebApi.js'
        ),
        isInSection: jest.fn()
    })
);

describe('features - LN-common - anexo - default', () => {
    isInSection.mockRestore();
    const propsHtml = {
        collection: 'features',
        type: 'LN-common/anexo',
        id: 'f0fzNPnpdFcOa8T',
        name: null,
        customFields: {
            html: `<p>Mock HTML anexo</p>`,
            hideByHtml: false,
            mobileFullWidth: true
        }
    };

    describe('AnexoFeature - VivoYoutube Section', () => {
        it('renders vivoYoutube content when videoComercial is true', () => {
            const props = {
                id: 'vivoYoutube-container',
                customFields: {
                    vivoYoutube: '<div>Video Content</div>',
                    videoComercial: true
                },
                isAdmin: false
            };

            render(<AnexoFeature {...props} />);

            const container = screen.getByTestId(
                'vivoYoutube-container-anexo-disabled'
            );
            expect(container.innerHTML).toBe('<div>Video Content</div>');
        });

        it('calls setupIntersectionObserver when videoComercial is false', () => {
            const props = {
                id: 'test-id',
                customFields: {
                    vivoYoutube: '<div>Video Content</div>',
                    videoComercial: false
                },
                isAdmin: false
            };

            render(<AnexoFeature {...props} />);

            expect(setupIntersectionObserver).toHaveBeenCalledWith(
                expect.any(Object),
                '<div>Video Content</div>'
            );
        });

        it('updates vivoYoutube content when props change', () => {
            const { rerender } = render(
                <AnexoFeature
                    id="test-id"
                    customFields={{
                        vivoYoutube: '<div>Initial Content</div>',
                        videoComercial: true
                    }}
                    isAdmin={false}
                />
            );

            const container = screen.getByTestId(
                'vivoYoutube-container-anexo-disabled'
            );
            expect(container.innerHTML).toBe('<div>Initial Content</div>');

            rerender(
                <AnexoFeature
                    id="test-id"
                    customFields={{
                        vivoYoutube: '<div>Updated Content</div>',
                        videoComercial: true
                    }}
                    isAdmin={false}
                />
            );

            expect(container.innerHTML).toBe('<div>Updated Content</div>');
        });
    });

    describe('With HTML anexo props', () => {
        it('Should render HTML anexo correctly', () => {
            const { container } = render(<AnexoFeature {...propsHtml} />);

            const buildRoofClass = container.querySelector('.ln-roof');
            expect(buildRoofClass).toBeInTheDocument();

            const comAnexoClass = container.querySelector('.ln-roof');
            expect(comAnexoClass).toBeInTheDocument();

            const anexoDiv = screen.getByText(/Mock HTML anexo/i);
            expect(anexoDiv).toBeInTheDocument();
            expect(anexoDiv.outerHTML).toMatch(propsHtml.customFields.html);
        });

        it('Should match HTML anexo snapshot', () => {
            const component = render(<AnexoFeature {...propsHtml} />);
            expect(component).toMatchSnapshot();
        });

        it('With hideByHtml true - Should return null', () => {
            const propsHtml = {
                customFields: {
                    html: '<div class="com-anexo">Anexo Content</div>',
                    hideByHtml: true
                }
            };

            const { container } = render(<AnexoFeature {...propsHtml} />);

            const anexoDiv = container.querySelector('.com-anexo');
            expect(anexoDiv).toBeNull();
        });
    });

    describe('With anexo URL props', () => {
        const propsUrl = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0f0raOK8mKx1sc',
            name: null,
            customFields: {
                url: 'https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas-test/',
                heightDesktop: 300,
                heightTablet: 150,
                heightMobile: 100,
                hideByUrl: false,
                hideByHtml: true
            }
        };

        it('Should render iframe correctly', () => {
            const { container } = render(<AnexoFeature {...propsUrl} />);

            expect(container).not.toBeNull();

            const iframe = container.querySelector('iframe');

            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute(
                'data-src',
                propsUrl.customFields.url
            );
            expect(iframe).toHaveAttribute('src', undefined);

            const buildRoofComponent = container.querySelector('.ln-roof');
            expect(buildRoofComponent).toBeInTheDocument();
        });

        it('Should generate style tag with media queries correctly', () => {
            const { container } = render(<AnexoFeature {...propsUrl} />);

            expect(container).not.toBeNull();

            const styleTag = container.querySelector('style');
            expect(styleTag).toBeInTheDocument();

            expect(styleTag.textContent).toMatch(
                '#anexo-responsive-f0f0raOK8mKx1sc{height:100px}'
            );
            expect(styleTag.textContent).toMatch(
                '@media(min-width:768px){#anexo-responsive-f0f0raOK8mKx1sc{height:150px}}'
            );
            expect(styleTag.textContent).toMatch(
                '@media(min-width:1024px){#anexo-responsive-f0f0raOK8mKx1sc{height:300px}}'
            );
        });

        it('Should match URL anexo snapshot', () => {
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component).toMatchSnapshot();
        });

        it('Should set src when isAdmin (PB) and NOT data-src', () => {
            Context.useAppContext = jest.fn(() => ({
                contextPath: '/pf',
                deployment: arg => arg,
                isAdmin: true,
                layout: ''
            }));

            const { container } = render(<AnexoFeature {...propsUrl} />);

            const iframe = container.querySelector('iframe');
            expect(iframe).toBeInTheDocument();
            expect(iframe).toHaveAttribute('src');
            expect(iframe).not.toHaveAttribute('data-src');
        });

        it('With hideByUrl true - Should return null', () => {
            propsUrl.customFields.hideByUrl = true;

            const { container } = render(<AnexoFeature {...propsUrl} />);

            expect(container.firstChild).toBeNull();
        });

        it('Without any of 3 heights on URL anexo - Should return ErrorMessage', () => {
            propsUrl.customFields.hideByUrl = false;
            propsUrl.customFields.heightDesktop = undefined;
            Context.useAppContext = jest.fn(() => ({
                ...defaultContextValue,
                isAdmin: true
            }));
            const { container } = render(<AnexoFeature {...propsUrl} />);

            expect(container).toHaveTextContent(
                'Los tres altos fijos del anexo (Desktop, Tablet y Mobile) son campos requeridos para los anexos con URL'
            );
        });

        it('When any of the 3 heights exceed limit inside Apertura - Should return ErrorMessage', () => {
            propsUrl.customFields.heightDesktop = 700;
            isInSection.mockImplementation(() => true);
            Context.useAppContext = jest.fn(() => ({
                ...defaultContextValue,
                isAdmin: true
            }));
            const { container } = render(<AnexoFeature {...propsUrl} />);

            expect(container).toHaveTextContent('Advertencia');
            expect(container).toHaveTextContent(
                'Los altos fijos máximos de anexos con URL en pre apertura son de 300px para Desktop, Tablet y Mobile. Corrijalos, caso contrario no se verá el anexo'
            );
        });

        it('Should respect hideTitle prop in Iframe component', () => {
            const propsUrlWithHideTitle = {
                ...propsUrl,
                customFields: {
                    ...propsUrl.customFields,
                    hideTitle: true
                }
            };

            const { container } = render(
                <AnexoFeature {...propsUrlWithHideTitle} />
            );

            const buildRoofClass = container.querySelector('.ln-roof');
            expect(buildRoofClass).not.toBeInTheDocument();
        });
    });

    describe('Without right props', () => {
        it('Should return ErrorMessage', () => {
            Context.useAppContext = jest.fn(() => ({
                ...defaultContextValue,
                isAdmin: true
            }));
            const { container } = render(<AnexoFeature />);

            expect(container).toHaveTextContent(
                'Se requiere que agregue la URL,HTML o VIVO YOUTUBE del anexo'
            );
        });
    });

    describe('getComponentFromConfig', () => {
        it('should render an empty fragment when the type is not recognized and there is no error message', () => {
            const type = 'Unknown';
            const props = {
                id: '123'
            };
            const bannerMob = <div>Banner Mobile</div>;
            const bannerDsk = <div>Banner Desktop</div>;
            const roofData = { logoId: '456', link: 'https://example.com' };
            const classNameRoof = 'roof-class';

            const result = getComponentFromConfig(
                type,
                props,
                bannerMob,
                bannerDsk,
                roofData,
                classNameRoof
            );

            expect(result).toEqual(null);
        });

        it('should render an empty fragment when the Html component has no HTML content', () => {
            const type = 'Html';
            const props = {
                id: '123',
                customFields: {}
            };
            const bannerMob = <div>Banner Mobile</div>;
            const bannerDsk = <div>Banner Desktop</div>;
            const roofData = { logoId: '456', link: 'https://example.com' };
            const classNameRoof = 'roof-class';

            const result = getComponentFromConfig(
                type,
                props,
                bannerMob,
                bannerDsk,
                roofData,
                classNameRoof
            );

            expect(result).toEqual(expect.any(Object));
        });

        it('should render an Iframe component with an empty data-src', () => {
            const type = 'Iframe';
            const props = {
                id: '123',
                customFields: {}
            };
            const bannerMob = <div>Banner Mobile</div>;
            const bannerDsk = <div>Banner Desktop</div>;
            const roofData = { logoId: '456', link: 'https://example.com' };
            const classNameRoof = 'roof-class';

            const expectedIframeResult = (
                <React.Fragment>
                    <div className="roof-class">
                        <BuildRoof
                            buttonStyle=""
                            buttonText=""
                            chainStyle="generic"
                            hideRoof={false}
                            link="https://example.com"
                            linkButton=""
                            logoId="456"
                            navigationId=""
                            titleLink=""
                        />
                    </div>
                    <iframe
                        data-src=""
                        frameBorder="0"
                        height="100%"
                        id="anexo-123"
                        title="anexo-123"
                        width="100%"
                    />
                </React.Fragment>
            );

            const result = getComponentFromConfig(
                type,
                props,
                bannerMob,
                bannerDsk,
                roofData,
                classNameRoof
            );

            expect(result).toEqual(expectedIframeResult);
        });

        describe('getComponentType', () => {
            it('should return "Error" for admin with error message', () => {
                const result = getComponentType({
                    isAdmin: true,
                    errorMessage: 'Test error message'
                });
                expect(result).toBe('Error');
            });

            it('should return "Html" for non-admin with HTML content', () => {
                const result = getComponentType({
                    isAdmin: false,
                    customFields: {
                        html: '<p>Test HTML content</p>'
                    }
                });
                expect(result).toBe('Html');
            });

            it('should return "VivoYoutube" for non-admin with VivoYoutube content', () => {
                const result = getComponentType({
                    isAdmin: false,
                    customFields: {
                        vivoYoutube:
                            '<div class="embed-code" data-src="https://www.youtube.com/embed/ZGy4e2M2Vsc?autoplay=1&amp;amp;mute=1"><iframe width="100%" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" src="https://www.youtube.com/embed/ZGy4e2M2Vsc?autoplay=1&amp;amp;mute=1"></iframe></div>'
                    }
                });
                expect(result).toBe('VivoYoutube');
            });

            it('should return "Iframe" for non-admin with URL and height settings', () => {
                const result = getComponentType({
                    isAdmin: false,
                    customFields: {
                        url: 'https://example.com',
                        heightDesktop: '100px',
                        heightTablet: '75px',
                        heightMobile: '50px'
                    }
                });
                expect(result).toBe('Iframe');
            });

            it('should return "Iframe" for non-admin with URL and default height settings', () => {
                const result = getComponentType({
                    isAdmin: false,
                    customFields: {
                        url: 'https://example.com',
                        heightDesktop: '100px',
                        heightTablet: '75px',
                        heightMobile: '50px'
                    }
                });
                expect(result).toBe('Iframe');
            });

            const testCasesGetComponentType = [
                {
                    description:
                        'should return "Iframe" for non-admin with URL and hide settings',
                    input: {
                        isAdmin: false,
                        customFields: {
                            url: 'https://example.com',
                            hideByUrl: true
                        }
                    },
                    expected: false
                },
                {
                    description:
                        'should return "Iframe" for non-admin with URL and hide by HTML setting',
                    input: {
                        isAdmin: false,
                        customFields: {
                            url: 'https://example.com',
                            hideByHtml: true
                        }
                    },
                    expected: undefined
                }
            ];

            testCasesGetComponentType.forEach(
                ({ description, input, expected }) => {
                    it(description, () => {
                        const result = getComponentType(input);
                        expect(result).toBe(expected);
                    });
                }
            );

            it('should return undefined if no valid conditions are met', () => {
                const result = getComponentType({});
                expect(result).toBe('');
            });

            it('should have a default classname when mobileFullWidth is false', () => {
                const mutationProps = {
                    ...propsHtml,
                    customFields: {
                        ...propsHtml.customFields,
                        mobileFullWidth: false
                    }
                };
                render(<AnexoFeature {...mutationProps} />);
                const anexoDiv = screen.getByText('Mock HTML anexo');
                expect(anexoDiv.parentElement).toHaveClass('w-100');
            });
            it('should have a correcly classnames when mobileFullWidth is true', () => {
                render(<AnexoFeature {...propsHtml} />);
                const anexoDiv = screen.getByText('Mock HTML anexo');
                expect(anexoDiv.parentElement).toHaveClass(
                    'container-100vw_max767 w-100_md'
                );
            });
        });
    });

    describe('Scheduling rules', () => {
        const baseProps = {
            id: 'schedule-anexo',
            customFields: {
                html: '<div class="com-anexo">Anexo Content</div>',
                hideByHtml: false,
                enabledDays: []
            }
        };

        beforeEach(() => {
            isTodayEnabled.mockReturnValue(true);
            Context.useAppContext = jest.fn(() => ({ ...defaultContextValue }));
        });

        it('renders when scheduling is disabled regardless of enabledDays', () => {
            const props = {
                ...baseProps,
                customFields: {
                    ...baseProps.customFields,
                    shouldSchedule: false
                }
            };

            const { container } = render(<AnexoFeature {...props} />);

            expect(container.querySelector('.com-anexo')).toBeInTheDocument();
        });

        it('hides when scheduling is enabled but enabledDays is empty', () => {
            isTodayEnabled.mockReturnValue(false);

            const props = {
                ...baseProps,
                customFields: {
                    ...baseProps.customFields,
                    shouldSchedule: true
                }
            };

            const { container } = render(<AnexoFeature {...props} />);

            expect(container.firstChild).toBeNull();
        });

        it('renders when scheduling is enabled and today is allowed', () => {
            isTodayEnabled.mockReturnValue(true);

            const props = {
                ...baseProps,
                customFields: {
                    ...baseProps.customFields,
                    enabledDays: ['lunes'],
                    shouldSchedule: true
                }
            };

            const { container } = render(<AnexoFeature {...props} />);

            expect(container.querySelector('.com-anexo')).toBeInTheDocument();
        });

        it('allows admin users to view even when scheduling conditions fail', () => {
            Context.useAppContext = jest.fn(() => ({
                ...defaultContextValue,
                isAdmin: true
            }));

            isTodayEnabled.mockReturnValue(false);

            const props = {
                ...baseProps,
                customFields: {
                    ...baseProps.customFields,
                    shouldSchedule: true
                }
            };

            const { container } = render(<AnexoFeature {...props} />);

            expect(container.querySelector('.com-anexo')).toBeInTheDocument();
        });
    });
});
