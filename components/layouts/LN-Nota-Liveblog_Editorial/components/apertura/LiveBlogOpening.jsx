import React from 'react';
import PropTypes from 'prop-types';
import OpeningDescription from './OpeningDescription';
import OpeningMedia from './OpeningMedia';
import OpeningEpigraph from './OpeningEpigraph';

function LiveBlogOpening({ children, data }) {
    const { caption, credit } = data;

    return (
        <>
            <div className="bg-neutral-dark-1 pt-65 -mt-65 pt-118_m -mt-87_m mt-0_l pt-112_l">
                <div className="lay px-0_max767 px-40_xl">
                    <div className="row">
                        <div className="grid text-light-50 gap-24 pb-32 w-100 grid-cols-12_m px-24_m grid-cols-16_lg gap-32_lg px-32_xl">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <OpeningEpigraph
                className="pt-8 px-16"
                variant="mobile"
                title={caption}
                credit={credit}
            />
        </>
    );
}

LiveBlogOpening.Description = OpeningDescription;
LiveBlogOpening.Media = OpeningMedia;

LiveBlogOpening.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({
        caption: PropTypes.shape({}),
        credit: PropTypes.shape({})
    })
};

LiveBlogOpening.defaultProps = {
    data: {}
};

export default LiveBlogOpening;
