import React from 'react';
import Text from '../../../common/text';
import Icon from '../../../common/icon';
import ModHeaderSection from '../../../common/mod-headerSection';

const IconsReferences = () => {
    const icons = [
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
        <div className="content-icon">
            <ModHeaderSection tag="h3" title="Referencias del clima" />
            <div className="icon-references">
                {icons &&
                    icons.map(({ id, description }) => (
                        <div className="card-icon" key={id}>
                            <Icon name={id} size="--xl" />
                            <Text size="--2xs">{description}</Text>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default IconsReferences;
