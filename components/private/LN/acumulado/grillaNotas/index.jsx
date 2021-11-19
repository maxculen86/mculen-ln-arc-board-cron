import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
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
        const { author_type: authorType, _id, Payload } = globalContent;
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

Index.propTypes = {
    size: PropTypes.number.isRequired,
    typeArticle: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        Payload: PropTypes.shape({
            items: PropTypes.array
        }),
        _id: PropTypes.string,
        author_type: PropTypes.string
    }).isRequired,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    bannerConfig: PropTypes.shape({
        background: PropTypes.bool,
        position: PropTypes.number,
        sticky: PropTypes.bool,
        tablet: PropTypes.string
    }).isRequired
};

export default Consumer(Index);
