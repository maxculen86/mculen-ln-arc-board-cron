/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import getVideosHelper from '../utils/hocVideosHelper';

function withVideosByIds(WrappedComponent, filter, website, published) {
    return Consumer(
        class extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    videos: []
                };
                this.getVideos();
            }

            getVideos() {
                const { cached, fetched } = this.getContent({
                    sourceName: 'ottVideosSource',
                    query: {
                        website,
                        published,
                        ids: this.props.videoIds
                    },
                    filter
                });
                getVideosHelper(cached, fetched, this.handleGetVideos);
            }

            handleGetVideos = value => (this.state.videos = value);

            render() {
                const { videos } = this.state;
                return <WrappedComponent videos={videos} {...this.props} />;
            }
        }
    );
}

export default withVideosByIds;
