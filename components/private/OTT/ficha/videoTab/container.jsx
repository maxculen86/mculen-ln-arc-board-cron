import React, { PureComponent } from 'react';
import VideoTabComponent from './component';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';
import dateHelper from '../../common/utils/dateHelper';

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
        console.log('PROPS', props);
    }

    render() {
        return (
            <>
                <meta
                    itemprop={'description'}
                    content={this.props.globalContent.description.basic}
                />
                <meta
                    itemprop={'name'}
                    content={this.props.globalContent.headlines.basic}
                />
                <meta
                    itemprop={'thumbnailUrl'}
                    content={this.props.globalContent.promo_image.url}
                />
                <meta
                    itemprop={'uploadDate'}
                    content={new Date(
                        this.props.globalContent.publish_date
                    ).toISOString()}
                />

                <meta
                    itemprop={'contentUrl'}
                    content={this.props.globalContent.streams[0].url}
                />
                <meta
                    itemprop={'duration'}
                    content={new Date(
                        this.props.globalContent.duration
                    ).toISOString()}
                />
                <VideoTabComponent
                    videoId={this.videoId}
                    videoHtml={this.videoHtml}
                    title={this.title}
                    videoSrc={this.videoSrc}
                    date={this.date}
                />
            </>
        );
    }
}

export default Consumer(VideoTab);
