import React, { PureComponent } from 'react';
import VideoTabComponent from './component';
import Consumer from 'fusion:consumer';
import get from 'lodash.get';

class VideoTab extends PureComponent {
    constructor(props) {
        super(props);
        console.log('PROPS', this.props);
        this.videoHtml = get(this.props.globalContent, 'embed_html', '');
        this.videoSrc = ''; //get(this.props.globalContent, 'embed_html', '')
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
