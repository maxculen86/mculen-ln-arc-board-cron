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

                const { sectionsInTree, termicas } = this.getSectionTree(
                    cached
                );

                this.state = {
                    sectionsInTree,
                    termicas
                };
            }

            getSectionTree = results => {
                const termicasInResults = (results && results.Termicas) || {};
                const sectionsInResults = (results && results.sections) || [];
                if (results) this.convertStringToBoolean(termicasInResults);
                return {
                    sectionsInTree: sectionsInResults,
                    termicas: termicasInResults
                };
            };

            convertStringToBoolean = termicasObj => {
                Object.keys(termicasObj).forEach(key => {
                    if (typeof termicasObj[key] === 'string') {
                        termicasObj[key].toLowerCase().trim() === 'true'
                            ? (termicasObj[key] = true)
                            : (termicasObj[key] = false);
                    }
                });
                return termicasObj;
            };

            render() {
                const { sectionsInTree, termicas } = this.state;

                return (
                    <WrappedComponent
                        {...this.props}
                        sections={sectionsInTree}
                        termicas={termicas}
                    />
                );
            }
        }
    );
}
