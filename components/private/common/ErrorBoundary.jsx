import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ErrorBoundary.propTypes = {
    children: PropTypes.node,
    fallback: PropTypes.node
};

ErrorBoundary.defaultProps = {
    children: null,
    fallback: null
};

export default ErrorBoundary;
