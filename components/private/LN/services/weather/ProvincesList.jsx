import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';

const ProvincesList = ({ provinces }) => {
    return (
        <div className="province-list">
            {provinces &&
                provinces.map(({ name }) => (
                    <div className="province">
                        <Text size="--md" weight="bold">
                            <ComLink
                                link="#"
                                title={`Ir a detalle clima de ${name}`}
                            >
                                {name}
                            </ComLink>
                        </Text>
                    </div>
                ))}
        </div>
    );
};

ProvincesList.propTypes = {
    provinces: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    )
};

ProvincesList.defaultProps = {
    provinces: []
};

export default ProvincesList;
