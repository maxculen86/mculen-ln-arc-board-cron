import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import { getEpigrafe } from '../../common/utils/mediaHelper';

const image = ({ data, withZoom, outputType }) => {
    const { caption, credit } = getEpigrafe(data);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        active
            ? document.body.classList.remove('--no-scroll')
            : document.body.classList.add('--no-scroll');
    };

    return (
        <Media
            mediaData={data}
            withZoom={withZoom}
            colNumber={12}
            handleClick={handleClick}
            active={active}
            outputType={outputType}
        >
            {data && (
                <ComFigcaption>
                    {caption}
                    {credit}
                </ComFigcaption>
            )}
        </Media>
    );
};

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        distributor: PropTypes.object,
        vanity_credits: PropTypes.shape({
            affiliation: PropTypes.array,
            by: PropTypes.array
        }),
        credits: PropTypes.shape(),
        type: PropTypes.string.isRequired
    }).isRequired,
    withZoom: PropTypes.string.isRequired,
    outputType: PropTypes.string
};

image.defaultProps = {
    outputType: 'default'
};

export default image;
