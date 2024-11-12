/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import logger from './utils/logger';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        logger.push(error, {
            source: 'Error Boundary - Article Feature LN 10'
        });
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            // You can render any custom fallback UI
            // eslint-disable-next-line no-console
            console.error('LN ErrorBoundary', this.state);
            return <></>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
