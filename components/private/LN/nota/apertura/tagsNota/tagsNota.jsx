import React, { Fragment } from 'react';
//import './index.css'

const TagsNota = props => {
    const {
        globalContent: {
            taxonomy: { tags }
        }
    } = props;
    const listTags = tags.map((tag, index) => {
        return (
            <Fragment key={index}>
                <strong className={tag.text}>
                    <a href={tag.slug}>{tag.text}</a>
                </strong>
                {index !== tags.length - 1 && <span> - </span>}
            </Fragment>
        );
    });

    return <div className="tags">{listTags}</div>;
};

export default TagsNota;
