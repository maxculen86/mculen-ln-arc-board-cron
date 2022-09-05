import React, { PureComponent } from 'react';
import Consumer from 'fusion:consumer';
import dateHelper from '../common/utils/dateHelper';
import Video from './video';
import VideoInfo from './videoInfo';
import get from '../../common/utils/get';

class VideoTab extends PureComponent {
    constructor(props) {
        super(props);
        const { globalContent } = this.props || {};
        this.videoId = get(globalContent, '_id', null);
        this.title = get(globalContent, 'headlines.basic', null);
        this.description = get(globalContent, 'description.basic', null);
        this.date = get(globalContent, 'publish_date', null);
        if (this.date) this.date = dateHelper.getVideoDateFormat(this.date);

        globalContent.streams.sort((a, b) => {
            return b.height - a.height;
        });
        try {
            this.analytics = [
                {
                    itemProp: 'description',
                    content: globalContent.description.basic
                },
                {
                    itemProp: 'name',
                    content: globalContent.headlines.basic
                },
                {
                    itemProp: 'thumbnailUrl',
                    content: globalContent.promo_image.url
                },
                {
                    itemProp: 'uploadDate',
                    content: new Date(globalContent.publish_date).toISOString()
                },
                {
                    itemProp: 'contentUrl',
                    content: globalContent.streams[0].url
                },
                {
                    itemProp: 'duration',
                    content: dateHelper.timeToIso8601(globalContent.duration)
                }
            ];
        } catch (e) {
            this.analytics = [];
        }
    }

    render() {
        return (
            <>
                <div
                    itemScope
                    itemType="http://schema.org/VideoObject"
                    style={{ display: 'none' }}
                >
                    {this.analytics.map(elem => (
                        <meta
                            itemProp={elem.itemProp}
                            content={elem.content}
                            key={this.videoId}
                        />
                    ))}
                </div>
                <Video videoId={this.videoId} />
                <VideoInfo title={this.title} date={this.date} />
            </>
        );
    }
}

export default Consumer(VideoTab);
