import React, { Component } from 'react';
import VideoInfoComponent from './component';
import get from 'lodash.get';
export default class videoInfo extends Component {
    render() {
        const { title, date, categories, shareConfig } = this.props;
        const fbHref = get(shareConfig, 'facebook.href', null);
        const twHref = get(shareConfig, 'twitter.href', null);
        return (
            <VideoInfoComponent
                title={title}
                date={date}
                categories={categories}
                twitterHref={twHref}
                facebookHref={fbHref}
            />
        );
    }
}
