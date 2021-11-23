'use strict';

import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import {
    sourceName,
    lastVideosBySectionQuery
} from '../../../../content/queries/videosSearchSource';

function withLastVideosBySection(
    WrappedComponent,
    filter,
    website,
    published,
    pageSize
) {
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
                this.getVideos(true);
            }

            getVideos(isConstructor) {
                const { cached, fetched } = this.getContent({
                    sourceName: sourceName,
                    query: {
                        website: website,
                        published: published,
                        query: lastVideosBySectionQuery({
                            sectionName: this.props.sectionId,
                            from: this.state.from,
                            size: pageSize
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

                // TODO: Revisar porque se construye dos veces y la primera vez es undefined
                fetched.then(response => {
                    if (!response) return;
                    let fetchedVideos = get(response, 'content_elements', null);
                    fetchedVideos = fetchedVideos.slice(0); //copy data
                    // TODO: Arreglar esto ( Debe ir this.setState )
                    this.state.hasNext = get(response, 'next', null) != null;
                    if (fetchedVideos) {
                        this.setState(ps => {
                            const videosarr = ps.videos;
                            videosarr.splice(
                                videosarr.length - ps.lastCachedItemsCount
                            );
                            return {
                                videos: [...videosarr, ...fetchedVideos],
                                lastCachedItemsCount: 0
                            };
                        });
                    }
                });
            }

            nextPage = () => {
                this.state.from = this.state.from + pageSize;
                this.getVideos(false);
            };

            render() {
                return (
                    <WrappedComponent
                        nextPage={this.nextPage}
                        hasNextPage={this.state.hasNext}
                        videos={this.state.videos}
                        {...this.props}
                    />
                );
            }
        }
    );
}

export default withLastVideosBySection;
