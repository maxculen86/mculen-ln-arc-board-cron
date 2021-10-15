/* eslint-disable react/static-property-placement */
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import get from '../../../common/utils/get';

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
                        website,
                        sectionId: props.sectionId
                    },
                    transform: resp => {
                        const { Termicas, sections } = resp || {};
                        return { Termicas, sections };
                    }
                });

                const { sections, termicas } = this.getSectionTree(cached);

                this.state = {
                    sections,
                    termicas
                };
            }
            /* Esta logica se paso del lado del navigationTreeSource
            getSections = results => {
                const sections = [];
                const { sectionId } = this.props;
                const sectionList =
                    sectionId &&
                    sectionId.split('/').map(el => {
                        return el ? `/${el}` : '';
                    });

                const { _id: id, name } = results;
                const base = id &&
                    name && {
                        id,
                        name,
                        path: id
                    };

                if (base) {
                    sections.push(base);
                    if (sectionList) sectionList.shift();
                }

                let section = results;
                if (sectionId && sectionList && sectionList.length) {
                    do {
                        const primarySectionId = sectionList[0];
                        const { children } = section;
                        [section] =
                            primarySectionId &&
                            children &&
                            children.filter(el => el._id === primarySectionId);
                        if (section) {
                            sections.push({
                                id: section._id,
                                name: section.name,
                                path: section._id
                            });
                            if (sectionList.length >= 2) {
                                sectionList[0] = sectionList[0].concat(
                                    sectionList[1]
                                );
                                sectionList.splice(1, 1);
                            }
                        }
                    } while (section);
                }

                return sections;
            };
            */

            getSectionTree = results => {
                const termicas = (results && results.Termicas) || {};
                const sections = (results && results.sections) || [];
                // const sections = (results && this.getSections(results)) || [];
                if (results) this.convertStringToBoolean(termicas);
                return { sections, termicas };
            };

            convertStringToBoolean = termicas => {
                Object.keys(termicas).forEach(key => {
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
