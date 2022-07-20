import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';
import ModHeaderSection from '../../../common/mod-headerSection';

const ProvincesList = ({ provinces }) => {
    return (
        <>
            <ModHeaderSection tag="h2" title="Listado de provincias" />
            <div className="province-list">
                {provinces &&
                    provinces.map(({ name }) => (
                        <div className="province">
                            <Text size="--md" weight="bold">
                                <ComLink
                                    link="#" // TODO agregar linkeo a la provincia
                                    title={`Ir a detalle clima de ${name}`}
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
