import React, { PureComponent } from 'react';
import VideoTabComponent from './component';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import dateHelper from '../../common/utils/dateHelper';
import { catchClause } from '@babel/types';

class VideoTab extends PureComponent {
    constructor(props) {
        super(props);
        this.videoId = get(this.props.globalContent, '_id', null);
        this.title = get(this.props.globalContent, 'headlines.basic', null);
        this.description = get(
            this.props.globalContent,
            'description.basic',
            null
        );
        this.date = get(this.props.globalContent, 'publish_date', null);
        if (this.date) this.date = dateHelper.getVideoDateFormat(this.date);
        this.props.globalContent.streams;

        this.props.globalContent.streams.sort((a, b) => {
            return b.height - a.height;
        });
        try {
            this.analytics = [
                {
                    itemProp: 'description',
                    content: this.props.globalContent.description.basic
                },
                {
                    itemProp: 'name',
                    content: this.props.globalContent.headlines.basic
                },
                {
                    itemProp: 'thumbnailUrl',
                    content: this.props.globalContent.promo_image.url
                },
                {
                    itemProp: 'uploadDate',
                    content: new Date(
                        this.props.globalContent.publish_date
                    ).toISOString()
                },
                {
                    itemProp: 'contentUrl',
                    content: this.props.globalContent.streams[0].url
                },
                {
                    itemProp: 'duration',
                    content: new Date(
                        this.props.globalContent.duration
                    ).toISOString()
                }
            ];
        } catch (e) {
            this.analytics = [];
        }
    }

    render() {
        return (
            <VideoTabComponent
                videoId={this.videoId}
                title={this.title}
                date={this.date}
                analytics={this.analytics}
            />
        );
    }
}

export default Consumer(VideoTab);
