import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';
import ModHeaderSection from '../../../common/mod-headerSection';

const ProvincesList = ({ provinces }) => {
    return (
        <>
            <ModHeaderSection tag="h3" title="Provincias" />
            <div className="province-list">
                {provinces &&
                    provinces.map(({ name, _id }) => (
                        <div className="province" key={name}>
                            <Text tag="h2" size="--md" weight="bold">
                                <ComLink
                                    link={_id}
                                    title={`Ir al clima de ${name}`}
                                >
                                    {name}
                                </ComLink>
                            </Text>
                        </div>
                    ))}
            </div>
        </>
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
