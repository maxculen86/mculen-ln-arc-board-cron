import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import GrillaNotas from './grillaNotas';

class Index extends Component {
    render() {
        const {
            siteProperties,
            size,
            globalContent,
            typeArticle,
            bannerConfig
        } = this.props;
        const { author_type: authorType, _id, Payload } = globalContent || {};
        const tagId =
            Payload && Payload.items && Payload.items.length
                ? Payload.items[0].slug
                : undefined;

        const sectionId = !authorType && !Payload ? _id : null;
        const authorId = authorType ? _id : null;
        return (
            <GrillaNotas
                authorId={authorId}
                tagId={tagId}
                sectionId={sectionId}
                size={size}
                page={1}
                siteProperties={siteProperties}
                typeArticle={typeArticle}
                bannerConfig={bannerConfig}
            />
        );
    }
}

export default Consumer(Index);
