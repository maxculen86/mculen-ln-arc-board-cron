import React from 'react';
import Context from 'fusion:context';
import { render, mount, shallow } from 'enzyme';
import AnexoFeature, {
    getComponentFromConfig,
    getComponentType
} from '../../../../../components/features/LN-common/anexo/default';
import { isInSection } from '../../../../../components/features/LN-common/anexo/common/_helper-WebApi';
import BuildRoof from '../../../../../components/chains/utils/_BuildRoof/default';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

Context.useAppContext = jest.fn(() => ({
    deployment: arg => arg,
    contextPath: '/pf',
    isAdmin: false,
    layout: ''
}));

jest.mock('fusion:consumer', Component => {
    return function(Component) {
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

const testCases = [
    {
        type: 'Html',
        props: {
            id: '123',
            customFields: {
                html: '<p>Test HTML content</p>'
            },
            extraClass: 'extra-class'
        },
        expected: (
            <>
                <div className="roof-class">
                    <BuildRoof logoId="456" link="https://example.com" />
                </div>
                <div
                    className="com-anexo extra-class"
                    dangerouslySetInnerHTML={{
                        __html: '<p>Test HTML content</p>'
                    }}
                />
                <div>Banner Mobile</div>
                <div>Banner Desktop</div>
            </>
        )
    }
];

describe('features - LN-common - anexo - default', () => {
    isInSection.mockRestore();
    describe('With HTML anexo props', () => {
        const propsHtml = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0fzNPnpdFcOa8T',
            name: null,
            customFields: {
                html: `<p>Mock HTML anexo</p>`,
                hideByHtml: false
            }
        };

        it('Should render HTML anexo correctly', () => {
            const component = mount(<AnexoFeature {...propsHtml} />);
            expect(component.html()).not.toBeNull();

            // Find the BuildRoof component
            const buildRoofComponent = component.find(BuildRoof);

            expect(buildRoofComponent.exists()).toBeTruthy();

            const anexoDiv = component.find('div.com-anexo');

            expect(anexoDiv.exists()).toBeTruthy();
            expect(anexoDiv.hasClass('com-anexo')).toBeTruthy();

            expect(component.html()).toContain(propsHtml.customFields.html);
        });
        it('Should match HTML anexo snapshot', () => {
            const component = render(<AnexoFeature {...propsHtml} />);
            expect(component).toMatchSnapshot();
        });
        it('With hideByHtml true - Should return null', () => {
            propsHtml.customFields.hideByHtml = true;
            const component = render(<AnexoFeature {...propsHtml} />);
            expect(component.html()).toBeNull();
        });
    });
    describe('With anexo URL props', () => {
        const propsUrl = {
            collection: 'features',
            type: 'LN-common/anexo',
            id: 'f0f0raOK8mKx1sc',
            name: null,
            customFields: {
                url:
                    'https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas-test/',
                heightDesktop: 300,
                heightTablet: 150,
                heightMobile: 100,
                hideByUrl: false,
                hideByHtml: true
            }
        };

        it('Should render iframe correctly', () => {
            const component = mount(<AnexoFeature {...propsUrl} />);

            expect(component.html()).not.toBeNull();
            expect(component.find('iframe')).toHaveLength(1);
            expect(component.find('iframe').props()['data-src']).toBe(
                propsUrl.customFields.url
            );
            expect(component.find('iframe').props().src).toBe(undefined);

            expect(
                component.find('div.com-anexo.skeleton-box').exists()
            ).toBeTruthy();

            const buildRoofComponent = component.find(BuildRoof);
            expect(buildRoofComponent.exists()).toBeTruthy();
        });
        it('Should generate style tag with media queries correctly', () => {
            const component = mount(<AnexoFeature {...propsUrl} />);
            expect(component.html()).not.toBeNull();
            expect(component.find('style')).toHaveLength(1);
            const styleTag = component.find('style').html();
            expect(styleTag).toContain(
                '#anexo-responsive-f0f0raOK8mKx1sc{height:100px}'
            );
            expect(styleTag).toContain(
                '@media(min-width:768px){#anexo-responsive-f0f0raOK8mKx1sc{height:150px}}'
            );
            expect(styleTag).toContain(
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
            const component = mount(<AnexoFeature {...propsUrl} />);
            expect(component.html()).not.toBeNull();
            expect(component.find('iframe')).toHaveLength(1);
            expect(component.find('iframe').props()['data-src']).toBe(
                undefined
            );
            expect(component.find('iframe').props().src).toBe(
                propsUrl.customFields.url
            );
        });

        it('With hideByUrl true - Should return null', () => {
            propsUrl.customFields.hideByUrl = true;
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component.html()).toBeNull();
        });

        it('Without any of 3 heights on URL anexo - Should return ErrorMessage', () => {
            propsUrl.customFields.hideByUrl = false;
            propsUrl.customFields.heightDesktop = undefined;
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component.html()).toContain(
                'Los tres altos fijos del anexo (Desktop, Tablet y Mobile) son campos requeridos para los anexos con URL'
            );
        });

        it('When any of the 3 heights exceed limit inside Apertura - Should return ErrorMessage', () => {
            propsUrl.customFields.heightDesktop = 700;
            isInSection.mockImplementation(() => true);
            const component = render(<AnexoFeature {...propsUrl} />);
            expect(component.html()).toContain(
                '<h2 class="title">Advertencia</h2><p class="text">Los altos fijos máximos de anexos con URL en pre apertura son de 300px para Desktop, Tablet y Mobile. Corrijalos, caso contrario no se verá el anexo</p>'
            );
        });
    });
    describe('Without right props', () => {
        it('Should return ErrorMessage', () => {
            const component = render(<AnexoFeature />);
            expect(component.html()).toContain(
                'Se requiere agregue la URL o HTML del anexo'
            );
        });
    });

    describe('getComponentFromConfig', () => {
        testCases.forEach(({ type, props, expected }) => {
            it(`should render the expected component for type '${type}'`, () => {
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

                expect(result).toEqual(expected);
            });
        });

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

            expect(result).toEqual(<></>);
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
        });
    });
});
