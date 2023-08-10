import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';
import StaticContent from '../../../common/staticContent';

const PowerUpLiveBlog = ({ data = {} }) => {
    const { embed = {}, _id = '' } = data;
    const { config = {} } = embed;
    const { time = '', title = '' } = config;

    const timeWithoutSeconds = (timeString = '') => {
        const timeArray = timeString.split(':');
        timeArray.length > 2 && timeArray.pop();
        return timeArray.join(':');
    };

    if (time === '' || title === '') return <></>;

    return (
        <StaticContent id={_id}>
            <ComTitle
                tag="h2"
                size="--xl"
                weight="--font-extra"
                content={`${timeWithoutSeconds(time)} | ${title}`}
            />
        </StaticContent>
    );
};

PowerUpLiveBlog.arcType = 'custom-liveblog';

PowerUpLiveBlog.propTypes = {
    data: PropTypes.shape({
        embed: PropTypes.shape({
            config: PropTypes.shape({
                time: PropTypes.string,
                title: PropTypes.string
            })
        })
    }).isRequired
};

export default PowerUpLiveBlog;
