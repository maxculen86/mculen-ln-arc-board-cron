import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../../../components/features/OTT/header';

jest.mock(
    '../../../../components/private/common/staticContent',
    () => 'mock-static-content'
);

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
            expect(container).toMatchSnapshot();
        });
    });
});
