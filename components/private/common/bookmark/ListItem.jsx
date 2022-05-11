import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from '../com-button';
import Text from '../text';
import '../../../../resources/dist/css/ln/components/list-item.css';

const ListItem = ({ className, children, text }) => {
    const [openList, setOpenList] = useState(false);
    const handleIconStatus = () => {
        setOpenList(!openList);
    };
    const extraClass = className ? ` --${className}` : '';
    const isClosed = !openList ? ' --closed' : '';
    return (
        <div className={`list-item${extraClass}${isClosed}`}>
            <div className="action">
                <Text size="2xs">{text}</Text>
                {
                    {
                        false: (
                            <ComButton
                                onClick={handleIconStatus}
                                iconName="arrow-down"
                            />
                        ),
                        true: (
                            <ComButton
                                onClick={handleIconStatus}
                                iconName="arrow-up"
                            />
                        )
                    }[openList]
                }
            </div>
            {openList && <div className="list-content">{children}</div>}
        </div>
    );
};

ListItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    text: PropTypes.string
};
ListItem.defaultProps = {
    className: '',
    children: undefined,
    text: ''
};

export default ListItem;
