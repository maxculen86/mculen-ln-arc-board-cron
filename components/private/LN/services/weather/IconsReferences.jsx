import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import Icon from '../../../common/icon';

const IconsReferences = ({ icons }) => {
    return (
        <div className="icon-references">
            {icons &&
                icons.map(({ id, description }) => (
                    <div className="card-icon">
                        <Icon name={id} size="--xl" />
                        <Text tag="p" weight="light">
                            {description}
                        </Text>
                    </div>
                ))}
        </div>
    );
};

IconsReferences.propTypes = {
    icons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string
        })
    )
};

IconsReferences.defaultProps = {
    icons: []
};

export default IconsReferences;
