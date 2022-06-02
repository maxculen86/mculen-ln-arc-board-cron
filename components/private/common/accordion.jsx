/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from './com-button';
import '../../../resources/dist/css/ln/components/accordion.css';

const Accordion = ({ className, children, text }) => {
    const [openList, setOpenList] = useState(false);
    const handleAccordionStatus = () => {
        setOpenList(!openList);
    };
    const extraClass = className ? ` --${className}` : '';
    const isClosed = !openList ? ' --closed' : '';
    const rotate = openList ? ' --rotate' : '';
    return (
        <div className={`accordion${extraClass}${isClosed}`}>
            <div className="action">
                <span
                    className="--twoxs"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <ComButton
                    onClick={handleAccordionStatus}
                    iconName="arrow-down"
                    iconExtraClass={rotate}
                />
            </div>
            {openList && <div className="accordion-content">{children}</div>}
        </div>
    );
};

Accordion.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    text: PropTypes.string
};
Accordion.defaultProps = {
    className: '',
    children: undefined,
    text: ''
};

export default Accordion;
