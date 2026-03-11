import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        const { errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (errorInfo) {
            console.error('LN ErrorBoundary', this.state);
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return fallback || <></>;
        }

        return children;
    }
}

export default ErrorBoundary;
