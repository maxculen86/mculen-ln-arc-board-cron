import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function withNavigation(WrappedComponent, filter, website) {
    return Consumer(
        class extends PureComponent {
            state = { navigations: null };

            constructor(props) {
                super(props);
                this.getNavigation();
            }

            getNavigation() {
                const { cached, fetched } = this.getContent({
                    sourceName: 'navigationSource',
                    query: {
                        website,
                        hierarchy: this.props.hierarchy
                    },
                    filter
                });
                const cachedNavigations = get(cached, 'children', []);
                this.state.navigations = cachedNavigations;

                fetched.then(response => {
                    const fetchedNavigations = get(response, 'children', []);
                    if (fetchedNavigations) {
                        this.setState({ navigations: fetchedNavigations });
                    }
                });
            }

            render() {
                return (
                    <WrappedComponent
                        navigations={this.state.navigations}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withNavigation;
