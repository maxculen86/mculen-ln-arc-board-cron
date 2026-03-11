import React from 'react';
import Static from 'fusion:static';
import ComTitle from '../../../common/com-title';

function PowerUpLiveBlog({ data = {} }) {
    const { embed = {}, _id = '' } = data;
    const { config = {} } = embed;
    const { time = '', title = '' } = config;

    const timeWithoutSeconds = (timeString = '') => {
        const timeArray = timeString.split(':');
        if (timeArray.length > 2) timeArray.pop();
        return timeArray.join(':');
    };

    if (time === '' || title === '') return null;

    return (
        <Static id={`LN-liveblog-${_id}`}>
            <ComTitle
                tag="h2"
                size="--xl"
                weight="--font-extra"
                content={`${timeWithoutSeconds(time)} | ${title}`}
            />
        </Static>
    );
}

PowerUpLiveBlog.arcType = 'custom-liveblog';

export default PowerUpLiveBlog;
