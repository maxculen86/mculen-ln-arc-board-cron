import React from 'react';
import PropTypes from 'prop-types';
import OpeningContent from './OpeningContent';
import OpeningMeta from './OpeningMeta';

function NotaOpening({ children }) {
    return (
        <div>
            <div className="bg-neutral-dark-1 w-100 h-65 -mt-65 h-86_md -mt-87_m h-56_l mt-0_l" />
            <div className="lay">
                <div className="row">
                    <div className="col-12 pt-40 pb-68 pt-80_min512 px-94_max767 px-45_m px-67_l px-90_max1279 px-140_lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

NotaOpening.Content = OpeningContent;
NotaOpening.Meta = OpeningMeta;

NotaOpening.propTypes = {
    children: PropTypes.node.isRequired
};

NotaOpening.defaultProps = {};

export default NotaOpening;
