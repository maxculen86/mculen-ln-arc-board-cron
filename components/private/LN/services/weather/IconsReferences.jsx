import React from 'react';
import Text from '../../../common/text';
import Icon from '../../../common/icon';
import ModHeaderSection from '../../../common/mod-headerSection';

const IconsReferences = () => {
    const icons = [
        { id: 'sun', description: 'Despejado' },
        { id: 'snow-cloudy', description: 'Lluvia y Nevada' },
        { id: 'rain', description: 'Lluvias Fuertes' },
        { id: 'snow', description: 'Nevadas Fuertes' },
        { id: 'storm-cloudy', description: 'Lluvias Fuertes' },
        { id: 'sun-cloudy', description: 'Parcialmente nublado' },
        { id: 'cloudy', description: 'Mayormente nublado' },
        { id: 'clear-night', description: 'Despejado' },
        { id: 'rainy-cloudy', description: 'Llovizna' },
        { id: 'windy', description: 'Ventoso' }
    ];

    return (
        <div className="content-icon">
            <ModHeaderSection
                tag="h2"
                title="Referencias de las imagenes del clima con descripcion"
            />
            <div className="icon-references">
                {icons &&
                    icons.map(({ id, description }) => (
                        <div className="card-icon">
                            <Icon name={id} size="--xl" />
                            <Text size="--2xs">{description}</Text>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default IconsReferences;
