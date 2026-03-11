import React from 'react';
import Text from '../../../common/text';
import ComLink from '../../../common/com-link';
import ModHeaderSection from '../../../common/mod-headerSection';
import { addForwardSlash } from '../../common/utils/addForwardSlash';

function ProvincesList({ provinces }) {
    if (!provinces?.length) return null;
    return (
        <>
            <ModHeaderSection tag="h3" title="Provincias" />
            <div className="province-list">
                {provinces.map(({ name, _id }) => (
                    <div className="province" key={name}>
                        <Text tag="h2" size="--md" weight="bold">
                            <ComLink
                                link={addForwardSlash(_id)}
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
}

export default ProvincesList;
