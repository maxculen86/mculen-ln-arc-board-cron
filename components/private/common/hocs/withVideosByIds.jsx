import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

function withVideosByIds(WrappedComponent, filter, website, published) {
    return Consumer(
        class extends PureComponent {
            state = {
                videos: []
            };

            constructor(props) {
                super(props);
                this.getVideos();
            }

            getVideos() {
                const { cached, fetched } = this.getContent({
                    sourceName: 'ottVideosSource',
                    query: {
                        website: website,
                        published: published,
                        ids: this.props.videoIds
                    },
                    filter
                });
                const cachedVideos = get(cached, 'content_elements', null);

                if (cachedVideos) this.state.videos = cachedVideos;

                fetched.then(response => {
                    const fetchedVideos = get(
                        response,
                        'content_elements',
                        null
                    );
                    if (fetchedVideos) this.setState({ videos: fetchedVideos });
                });
            }

            render() {
                return (
                    <WrappedComponent
                        videos={this.state.videos}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withVideosByIds;
