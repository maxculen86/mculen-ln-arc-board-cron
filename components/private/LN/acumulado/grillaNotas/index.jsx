import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import GrillaNotas from './grillaNotas';

class Index extends Component {
    render() {
        return (
            <>
                <GrillaNotas section_id={this.props.globalContent._id} />
            </>
        );
    }
}

export default Consumer(Index);
