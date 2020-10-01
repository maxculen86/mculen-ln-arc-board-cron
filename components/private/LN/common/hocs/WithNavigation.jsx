import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

export default function WithNavigation(WrappedComponent) {
    return Consumer(
        class extends PureComponent {
            static get propTypes() {
                return {
                    sectionId: PropTypes.string
                };
            }

            static get defaultProps() {
                return {
                    sectionId: undefined
                };
            }

            constructor(props) {
                super(props);

                const website = get(this, 'props.arcSite', null);
                const { cached } = this.getContent({
                    sourceName: 'navigationTreeSource',
                    query: {
                        website
                    }
                });

                const { sections, termicas } = this.getSectionTree(cached);

                this.state = {
                    sections,
                    termicas
                };
            }

            // TODO: revisar esto!
            /*
            getNavigationTree = () => {
                const website = get(this, 'props.arcSite', null);
                const { cached, fetched } = this.getContent({
                    sourceName: 'navigationTreeSource',
                    query: {
                        website
                    }
                });

                if (cached) this.getSectionTree(cached);

                fetched.then(result => this.getSectionTree(result));
            };
            */
            getSectionTree = results => {
                const sections = [];
                let termicas = {};
                if (results) {
                    termicas = results.Termicas;
                    const { sectionId } = this.props;
                    sections.push({
                        id: results._id,
                        name: results.name,
                        path: results._id
                    });
                    let section = results;
                    if (sectionId) {
                        do {
                            section = section.children.filter(el =>
                                sectionId.includes(el._id)
                            )[0];
                            if (section) {
                                sections.push({
                                    id: section._id,
                                    name: section.name,
                                    path: section._id
                                });
                            }
                        } while (section);
                    }
                    this.convertStringToBoolean(termicas);
                    /*
                    this.setState({
                        sections,
                        termicas
                    });
                    */
                }
                return { sections, termicas };
            };

            convertStringToBoolean = termicas => {
                Object.keys(termicas).forEach(function(key) {
                    if (typeof termicas[key] === 'string') {
                        termicas[key].toLowerCase().trim() === 'true'
                            ? (termicas[key] = true)
                            : (termicas[key] = false);
                    }
                });
                return termicas;
            };

            render() {
                const { sections, termicas } = this.state;
                return (
                    <WrappedComponent
                        {...this.props}
                        sections={sections}
                        termicas={termicas}
                    />
                );
            }
        }
    );
}
