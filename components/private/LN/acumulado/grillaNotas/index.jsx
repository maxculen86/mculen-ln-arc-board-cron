import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import GrillaNotas from './grillaNotas';

const SIZE = 30;
class Index extends Component {
    render() {
        const size = this.props.size || SIZE;
        const { author_type, _id, Payload } = this.props.globalContent;
        const tagId =
            Payload.items && Payload.items.length
                ? Payload.items[0].slug
                : undefined;
        const { siteProperties } = this.props;
        const sectionId = !author_type && !Payload ? _id : null;
        const authorId = author_type ? _id : null;
        return (
            <GrillaNotas
                authorId={authorId}
                tagId={tagId}
                sectionId={sectionId}
                size={size}
                page={1}
                siteProperties={siteProperties}
            />
        );
    }
}

export default Consumer(Index);
