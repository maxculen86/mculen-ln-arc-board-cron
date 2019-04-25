import React, { PureComponent } from 'react';
import VideoTabComponent from '../componets/videoTab';
export default class VideoTab extends PureComponent {
    constructor(props) {
        super(props);
        this.videoSrc = '/abc';
        this.title = 'un titulo';
        this.date = '01-01-2019';
        this.categories = ['Deportes', 'Politica', 'LN+'];
        this.shareConfig = {
            Facebook: { href: 'www.facebook.com/1' },
            Twitter: { href: 'www.twitter.com.ar' }
        };
    }

    render() {
        return (
            <VideoTabComponent
                title={this.title}
                videoSrc={this.videoSrc}
                date={this.date}
                categories={this.categories}
                shareConfig={this.shareConfig}
            />
        );
    }
}
