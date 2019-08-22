import React, { Component } from 'react';
import GrillaNotas from './grillaNotas';

const SIZE = 2;
class Index extends Component {
    render() {
        return (
            <>
                <GrillaNotas
                    sectionId={this.props.globalContent._id}
                    size={SIZE}
                    page={1}
                />
            </>
        );
    }
}

export default Index;
