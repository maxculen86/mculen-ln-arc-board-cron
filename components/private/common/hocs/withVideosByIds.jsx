/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import getVideosHelper from '../utils/hocVideosHelper';

function withVideosByIds(WrappedComponent, filter, website, published) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.getVideos();
                this.state = {
                    videos: []
                };
            }

            getVideos() {
                const { videoIds } = this.props;
                const { cached, fetched } = this.getContent({
                    sourceName: 'ottVideosSource',
                    query: {
                        website,
                        published,
                        ids: videoIds
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

export default withVideosByIds;
