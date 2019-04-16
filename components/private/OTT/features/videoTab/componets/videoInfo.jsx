import React from 'react';
import FacebookButton from '../../../../common/containers/facebookButton';
import TweeterButton from '../../../../common/containers/tweeterButton';

export default function videoInfo({
    title,
    date,
    facebookHref,
    tweeterHref,
    categories
}) {
    return (
        <div>
            <p>{title}</p>
            <p>{date}</p>
            <TweeterButton href={tweeterHref} />
            <FacebookButton href={facebookHref} />
        </div>
    );
}
