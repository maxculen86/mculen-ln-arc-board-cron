import React, { PureComponent } from 'react';
import LastVideosByProgramComponent from '../components/lastVideosByProgram';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';
import {
    sourceName,
    lastVideosBySectionQuery
} from '../../../../../../content/queries/videosSearchSource';

const PAGE_SIZE = 12;
class LastVideosByProgram extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            from: 0,
            videos: [],
            lastCachedItemsCount: 0,
            hasNext: false,
            fetched: 0
        };
        this.getVideos(true);
    }

    getVideos(isConstructor) {
        const { cached, fetched } = this.getContent({
            sourceName: sourceName,
            query: {
                website: 'ott',
                published: true,
                query: lastVideosBySectionQuery({
                    sectionName: this.props.sectionId,
                    from: this.state.from,
                    size: PAGE_SIZE
                })
            },
            filter
        });
        const cachedVideos = get(cached, 'content_elements', null);
        this.state.hasNext = get(cached, 'next', null) != null;

        if (cachedVideos) {
            if (!isConstructor) {
                this.setState(ps => ({
                    videos: [...ps.videos, ...cachedVideos],
                    lastCachedItemsCount: cachedVideos.length
                }));
            } else {
                this.state.videos = cachedVideos;
                this.state.lastCachedItemsCount = cachedVideos.length;
            }
        } else this.state.lastCachedItemsCount = 0;

        fetched.then(response => {
            const fetchedVideos = get(response, 'content_elements', null);
            this.state.hasNext = get(response, 'next', null) != null;
            if (fetchedVideos) {
                this.setState(ps => {
                    let videosarr = ps.videos;
                    videosarr.splice(
                        videosarr.length - ps.lastCachedItemsCount
                    );
                    return {
                        videos: [...videosarr, ...fetchedVideos],
                        lastCachedItemsCount: 0,
                        fetched: response
                    };
                });
            }
        });
    }

    nextPage = () => {
        this.state.from = this.state.from + PAGE_SIZE;
        this.getVideos(false);
    };

    render() {
        if (!this.state.videos) return <></>;
        return (
            <LastVideosByProgramComponent
                videos={this.state.videos}
                nextPageHandler={this.nextPage}
                hasNext={this.state.hasNext}
            />
        );
    }
}

export default Consumer(LastVideosByProgram);
export const pageSize = PAGE_SIZE;
