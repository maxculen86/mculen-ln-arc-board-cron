import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { useAppContext } from 'fusion:context';
import Text from './text';
import ComLink from './com-link';
import getAssetsPath from './utils/getAssetsPath';

import '../../../resources/dist/css/ln/components/services-mini-card.css';

function ServiceMiniCard({
    title = 'Animales',
    icon = 'animals',
    labeled = 'Significado de los numeros',
    link = '',
    linkTitle = 'Significado de los numeros'
}) {
    const { contextPath, deployment } = useAppContext();
    const url = asset => getAssetsPath(contextPath)(deployment)(asset);

    const optionIcons = {
        animals: <img src={url('/lotteries/animals.svg')} alt="Animales" />,
        names: <img src={url('/lotteries/names.svg')} alt="Nombres" />,
        national: (
            <img src={url('/lotteries/national.svg')} alt="Loteria Nacional" />
        ),
        traditional: (
            <img src={url('/lotteries/traditional.svg')} alt="Tradicional" />
        )
    };

    return (
        <div className="box-number-meaning">
            <div className="meaning-number-text">
                <Text tag="h2" size="5xs">
                    {labeled}
                    <ComLink
                        classCondition="--m --font-bold"
                        link={link}
                        title={linkTitle}
                        textname={title}
                    />
                </Text>
            </div>
            <Icon size={40}>{optionIcons[icon]}</Icon>
        </div>
    );
}

export default ServiceMiniCard;
