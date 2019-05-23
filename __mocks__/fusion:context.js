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
                        {...this.props}
                    />
                );
            }
        }

        return element;
    };
});
