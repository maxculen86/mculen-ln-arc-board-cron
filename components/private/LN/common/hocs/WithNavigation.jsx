import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

export default function WithNavigation(WrappedComponent) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    sections: []
                };
                this.getNavigationTree().then(sections => {
                    debugger;
                    this.setState({
                        sections
                    });
                });
            }

            getNavigationTree = () => {
                const website = get(this, 'props.globalContent._website', null);
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
                const { sectionId } = this.props;
                sections.push({
                    id: results._id,
                    name: results.name,
                    path: results._id
                });
                let section = results;
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
                return sections;
            };

            render() {
                const { sections } = this.state;
                return <WrappedComponent {...this.props} sections={sections} />;
            }
        }
    );
}
