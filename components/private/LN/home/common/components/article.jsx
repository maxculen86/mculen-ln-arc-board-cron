import React, { Component } from 'react';
import Image from './articleImage';
import Title from './articleTitle';
import Tag from './articleTag';
import Subheader from './articleSubheader';

export default class Article extends Component {
    render() {
        const {
            renderClasses,
            imgUrls,
            url,
            teaser,
            title,
            tagName,
            subheader,
            classTag
        } = this.props;
        return (
            <article className={renderClasses}>
                <Image imgUrls={imgUrls} url={url} />
                <Title teaser={teaser} title={title} />
                {tagName && (
                    <Tag tagName={tagName} url={url} classes={classTag} />
                )}
                {subheader && <Subheader subheader={subheader} url={url} />}
            </article>
        );
    }
}
