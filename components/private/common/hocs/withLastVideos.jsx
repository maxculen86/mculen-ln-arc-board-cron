/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import {
    sourceName,
    lastVideosQuery
} from '../../../../content/queries/videosSearchSource';
import getVideosHelper from '../utils/hocVideosHelper';

function withLastVideos(WrappedComponent, filter, website, published) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.getVideos();
                this.state = {
                    from: 0,
                    videos: [],
                    lastCachedItemsCount: 0,
                    hasNext: false
                };
            }

            getVideos() {
                const { cached, fetched } = this.getContent({
                    sourceName,
                    query: {
                        website,
                        published,
                        query: lastVideosQuery()
                    },
                    filter
                });
                getVideosHelper(cached, fetched);
            }

            render() {
                const { videos } = this.state;

                return <WrappedComponent videos={videos} {...this.props} />;
            }
        }
    );
}

export default withLastVideos;
