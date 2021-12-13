/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../../../common/snippet/snippetRender';

const SnippetPaywall = props => {
    const {
        globalContent: {
            taxonomy: {
                primary_section: { path: primarySection = '' } = {}
            } = {}
        } = {}
    } = props || {};

    const data = {
        article: {
            'primary-section': primarySection
        }
    };
    return <SnippetRender id="paywall-data" data={data} />;
};

SnippetPaywall.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                path: PropTypes.string
            })
        })
    }).isRequired
};

export default SnippetPaywall;
