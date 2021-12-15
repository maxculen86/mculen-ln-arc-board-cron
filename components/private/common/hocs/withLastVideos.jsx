import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import {
    sourceName,
    lastVideosQuery
} from '../../../../content/queries/videosSearchSource';

function withLastVideos(WrappedComponent, filter, website, published) {
    return Consumer(
        class extends PureComponent {
            state = {
                from: 0,
                videos: [],
                lastCachedItemsCount: 0,
                hasNext: false
            };

            constructor(props) {
                super(props);
                this.getVideos();
            }

            getVideos() {
                const { cached, fetched } = this.getContent({
                    sourceName: sourceName,
                    query: {
                        website: website,
                        published: published,
                        query: lastVideosQuery()
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

export default withLastVideos;
