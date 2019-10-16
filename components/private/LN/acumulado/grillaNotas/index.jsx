import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import GrillaNotas from './grillaNotas';

class Index extends Component {
    render() {
        const { siteProperties, size, globalContent } = this.props;
        const { author_type, _id, Payload } = globalContent;
        const tagId =
            Payload && Payload.items && Payload.items.length
                ? Payload.items[0].slug
                : undefined;

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

Index.propTypes = {
    size: PropTypes.number,
    globalContent: PropTypes.shape({
        Payload: PropTypes.shape({
            items: PropTypes.array
        }),
        _id: PropTypes.string,
        author_type: PropTypes.string
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired
};

Index.defaultProps = {
    size: 30,
    globalContent: {
        Payload: undefined,
        _id: undefined,
        author_type: undefined
    }
};

export default Consumer(Index);
