import React, { Component } from 'react';
import GrillaNotas from './grillaNotas';

// TODO: pasar esto a un customField
const SIZE = 30;
class Index extends Component {
    render() {
        const { author_type, _id } = this.props.globalContent;
        const sectionId = !author_type ? _id : null;
        const authorId = author_type ? _id : null;
        return (
            <>
                <GrillaNotas
                    authorId={authorId}
                    sectionId={sectionId}
                    size={SIZE}
                    page={1}
                />
            </>
        );
    }
}

export default Index;
