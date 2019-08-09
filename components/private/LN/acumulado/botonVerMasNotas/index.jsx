import React, { Component } from 'react';
import Button from './button';

class Index extends Component {
    render() {
        return (
            <>
                <Button title={this.props.title} />
            </>
        );
    }
}

export default Index;
