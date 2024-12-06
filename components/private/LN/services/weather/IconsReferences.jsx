import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import Text from '../../../common/text';
import optionsIcons from './optionsIcons';
import ModHeaderSection from '../../../common/mod-headerSection';

function IconsReferences() {
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
    return (
        <div className="content-icon flex flex-column jc-center mb-32">
            <ModHeaderSection tag="h3" title="Referencias del clima" />
            <div className="icon-references w-100 p-16 rounded-4">
                {listIcons.map(({ id, description }) => (
                    <div
                        className="card-icon flex ai-center w-100 p-16"
                        key={id}
                    >
                        <Icon
                            size={24}
                            className="mr-16"
                            bgColor="#f2f2f2"
                            hasWrapper
                        >
                            {optionsIcons[id]}
                        </Icon>
                        <Text size="--2xs" extraClass="com-text">
                            {description}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IconsReferences;
