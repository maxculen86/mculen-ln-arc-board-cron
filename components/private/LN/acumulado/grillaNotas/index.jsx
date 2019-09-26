import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import GrillaNotas from './grillaNotas';

const SIZE = 30;
class Index extends Component {
    render() {
        const size = this.props.size || SIZE;
        const { author_type, _id } = this.props.globalContent;
        const sectionId = !author_type ? _id : null;
        const authorId = author_type ? _id : null;
        return (
            <GrillaNotas
                authorId={authorId}
                sectionId={sectionId}
                size={size}
                page={1}
            />
        );
    }
}

export default Consumer(Index);
