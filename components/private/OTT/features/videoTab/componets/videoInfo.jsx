import React from 'react';
import FacebookButton from '../../../../common/containers/facebookButton';
import TwitterButton from '../../../../common/containers/twitterButton';

export default function videoInfo({
    title,
    date,
    facebookHref,
    twitterHref,
    categories
}) {
    return (
        <div>
            <p>{title}</p>
            <p>{date}</p>
            <TwitterButton href={twitterHref} />
            <FacebookButton href={facebookHref} />
        </div>
    );
}
