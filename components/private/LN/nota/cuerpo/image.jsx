import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';
import ComFigcaption from '../../../common/com-figcaption';
import ComText from '../../../common/text';
import EpigrafeAndCreditsData from '../../../common/utils/epigrafeAndCreditsData';

const image = ({ data, withZoom, outputType }) => {
    const credito = EpigrafeAndCreditsData(data);
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
        active
            ? document.body.classList.remove('--no-scroll')
            : document.body.classList.add('--no-scroll');
    };

    return (
        <>
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
                        {data.caption && (
                            <ComText
                                extraClass="--caption --twoxs"
                                text={data.caption}
                            />
                        )}
                        {credito && (
                            <ComText
                                extraClass="--credit --twoxs"
                                text={credito}
                            />
                        )}
                    </ComFigcaption>
                )}
            </Media>
        </>
    );
};

image.arcType = 'image';

image.propTypes = {
    data: PropTypes.shape({
        caption: PropTypes.string,
        distributor: PropTypes.string,
        vanity_credits: PropTypes.array,
        credits: PropTypes.array,
        type: PropTypes.string.isRequired
    }).isRequired,
    withZoom: PropTypes.string.isRequired
};

export default image;
