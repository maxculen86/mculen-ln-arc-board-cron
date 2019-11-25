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
                this.state = {
                    sections: [],
                    termicas: {}
                };
                this.getNavigationTree().then(({ sections, termicas }) => {
                    this.setState({
                        sections,
                        termicas
                    });
                });
            }

            getNavigationTree = () => {
                const website = get(this, 'props.arcSite', null);
                const { cached, fetched } = this.getContent({
                    sourceName: 'navigationTreeSource',
                    query: {
                        website
                    }
                });

                return new Promise(resolve => {
                    if (cached) resolve(this.getSectionTree(cached));
                    else
                        fetched.then(result =>
                            resolve(this.getSectionTree(result))
                        );
                });
            };

            getSectionTree = results => {
                const sections = [];
                const termicas = results.Termicas;
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
                return { sections, termicas };
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
