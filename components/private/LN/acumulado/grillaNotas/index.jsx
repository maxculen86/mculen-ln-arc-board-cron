import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import GrillaNotas from './grillaNotas';

const SIZE = 30;
class Index extends Component {
    render() {
        return (
            <>
                <GrillaNotas
                    section_id={this.props.globalContent._id}
                    size={SIZE}
                    page={1}
                />
            </>
        );
    }
}

export default Consumer(Index);
