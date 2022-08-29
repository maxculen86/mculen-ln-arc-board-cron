import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from '../utils/get';

function withNavigation(WrappedComponent, filter, website) {
    return Consumer(
        class extends PureComponent {
            state = { sections: null };
            constructor(props) {
                super(props);
                this.getSections();
            }

            getSections() {
                const { cached, fetched } = this.getContent({
                    sourceName: 'sectionsSource',
                    query: {
                        website: website
                    },
                    filter
                });
                const cachedSections = get(cached, 'q_results', []);
                this.state.sections = cachedSections;

                fetched.then(response => {
                    const fetchedSections = get(response, 'q_results', []);
                    if (fetchedSections) {
                        this.setState({ sections: fetchedSections });
                    }
                });
            }

            render() {
                return (
                    <WrappedComponent
                        sections={this.state.sections}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withNavigation;
