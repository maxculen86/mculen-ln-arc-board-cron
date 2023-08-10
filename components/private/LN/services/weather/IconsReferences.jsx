import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import Text from '../../../common/text';
import optionsIcons from './optionsIcons';
import ModHeaderSection from '../../../common/mod-headerSection';

const IconsReferences = () => {
    const listIcons = [
        { id: 'sun', description: 'Despejado (día)' },
        { id: 'clear-night', description: 'Despejado (noche)' },
        { id: 'windy', description: 'Ventoso' },
        { id: 'sun-cloudy', description: 'Parcialmente nublado' },
        { id: 'cloudy', description: 'Mayormente nublado' },
        { id: 'rainy-cloudy', description: 'Llovizna' },
        { id: 'rain', description: 'Lluvias Fuertes' },
        { id: 'storm-cloudy', description: 'Tormentas' },
        { id: 'storm', description: 'Tormentas fuertes' },
        { id: 'snow-cloudy', description: 'Lluvia y Nevada' },
        { id: 'snow', description: 'Nevadas Fuertes' },
        { id: 'drop', description: 'Humedad' }
    ];
    if (!listIcons.length) return <></>;
    return (
        <div className="content-icon --d-flex --flex-col --jc-center --mb-lg">
            <ModHeaderSection tag="h3" title="Referencias del clima" />
            <div className="icon-references --w-100 --p-sm --rounded-4">
                {listIcons.map(({ id, description }) => (
                    <div
                        className="card-icon --d-flex --ai-center --w-100 --p-sm"
                        key={id}
                    >
                        <Icon
                            size={24}
                            className="--mr-sm"
                            bgColor="#f2f2f2"
                            hasWrapper
                        >
                            {optionsIcons[id]}
                        </Icon>
                        <Text size="--2xs" extraClass="com-text --flex">
                            {description}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconsReferences;
