import React from 'react';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import Static from 'fusion:static';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import withNavigation from '../../../../components/private/common/hocs/withNavigation';
import StaticContent from '../../../../components/private/common/staticContent';
import Header from '../../../../components/features/OTT/header';

jest.mock(
    '../../../../components/private/common/staticContent',
    () => 'mock-static-content'
);

jest.mock('fusion:static', () => 'mock-static');

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/common/hocs/withNavigation',
    compo =>
        function(compo) {
            class Hoc extends compo {
                constructor(props) {
                    super({ ...props, navigations: [] });
                }
            }
            return Hoc;
        }
);

jest.mock('fusion:properties', () => () => {
    return {
        header: {
            hierarchy: 'Header'
        }
    };
});

jest.mock('fusion:consumer', component => {
    return function(component) {
        return class extends component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent(param) {}
        };
    };
});

describe('components - features - OTT - header', () => {
    describe('When site has hydrateOnly', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                node_type: 'section'
            }
        }));
        const props = {
            arcSite: 'ott',
            id: '123456567',
            globalContent: {
                node_type: 'section'
            }
        };

        test('Header should be wrapped in static content tag', () => {
            const { container } = render(<Header {...props} />);
            expect(
                screen.getByText(
                    (content, element) =>
                        element.tagName.toLowerCase() === 'mock-static-content'
                )
            ).toBeVisible();
            expect(container).toMatchSnapshot();
        });
    });
    describe('When site has not hydrateOnly', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {
                node_type: undefined
            }
        }));
        const props = {
            arcSite: 'ott',
            id: '123456567',
            globalContent: {
                node_type: undefined
            }
        };

        test('Header should be wrapped in static tag', () => {
            const { container } = render(<Header {...props} />);
            expect(
                screen.getByText(
                    (content, element) =>
                        element.tagName.toLowerCase() === 'mock-static'
                )
            ).toBeVisible();
            expect(container).toMatchSnapshot();
        });
    });
});
