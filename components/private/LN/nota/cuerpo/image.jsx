import React, { useState } from 'react';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import { getEpigrafe } from '../../common/utils/mediaHelper';

const image = ({ data, withZoom, insideBody, outputType = 'default' }) => {
    const { caption, credit } = getEpigrafe(data);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        if (active) {
            document.body.classList.remove('--no-scroll');
        } else {
            document.body.classList.add('--no-scroll');
        }
    };

    return (
        <Media
            mediaData={data}
            withZoom={withZoom}
            colNumber={12}
            handleClick={handleClick}
            active={active}
            outputType={outputType}
            insideBody={insideBody}
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

export default image;
