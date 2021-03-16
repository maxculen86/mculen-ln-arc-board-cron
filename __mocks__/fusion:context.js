import React from 'react';
jest.mock('fusion:context', WrappedComponent => {
    return function(WrappedComponent) {
        class element extends WrappedComponent {
            constructor(props) {
                super(props);
                this.props = props;
            }
            render() {
                return (
                    <WrappedComponent
                        contextPath={'contextPath'}
                        deployment={path => `pathDeployment/${path}`}
                        siteProperties={{}}
                        arcSite="ott"
                        {...this.props}
                    />
                );
            }
        }

        return element;
    };
});

export const useAppContext = jest.fn();
export const useFusionContext = jest.fn(() => {
    return {
        isAdmin: false,
        siteProperties: {
            site: 'the-prophet'
        }
    };
});
