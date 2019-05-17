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
    }

    render() {
        return (
            <>
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
