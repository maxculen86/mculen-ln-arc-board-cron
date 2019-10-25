import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

function withColections(WrappedComponent, filter, website) {
    return Consumer(
        class extends Component {
            static get propTypes() {
                return {
                    size: PropTypes.string,
                    customFields: PropTypes.shape({
                        idCollection: PropTypes.string
                    })
                };
            }

            static get defaultProps() {
                return {
                    size: '2',
                    customFields: {
                        idCollection: undefined
                    }
                };
            }

            constructor(props) {
                super(props);

                this.state = {
                    articles: []
                };
            }

            componentDidMount() {
                const {
                    size,
                    customFields: { idCollection }
                } = this.props;

                if (!idCollection) return;

                const { cached, fetched } = this.getContent({
                    sourceName: 'collectionsSource',
                    filter,
                    query: {
                        size,
                        website,
                        id: idCollection
                    }
                });

                const cachedCollections = get(cached, 'content_elements', []);
                this.setState({ articles: cachedCollections.splice(0, 2) });

                fetched.then(response => {
                    const fetchedCollections = get(
                        response,
                        'content_elements',
                        []
                    );
                    if (fetchedCollections) {
                        this.setState({
                            articles: fetchedCollections.splice(0, 2)
                        });
                    }
                });

                return true;
            }

            render() {
                const { articles } = this.state;

                return (
                    <WrappedComponent
                        {...this.props}
                        articlesCollections={articles}
                    />
                );
            }
        }
    );
}

export default withColections;
