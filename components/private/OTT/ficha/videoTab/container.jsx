import React, { PureComponent } from 'react';
import VideoTabComponent from './component';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

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
        this.categories = get(
            this.props.globalContent,
            'taxonomy.sections',
            []
        );

        this.shareConfig = {
            Facebook: { href: 'www.facebook.com' },
            Twitter: { href: 'www.twitter.com.ar' }
        };
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
                    categories={this.categories}
                    shareConfig={this.shareConfig}
                />
            </>
        );
    }
}

export default Consumer(VideoTab);
