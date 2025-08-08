import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Tooltip } from '@ln/common-ui-tooltip';
import { Button } from '@ln/foodit-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { CardInfoNutricional } from './component/cardInfo';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { Carousel } from '../../../../chains/foodit-global/common/Carousel/foodit';

export function InfoNutricional() {
    const infoNutricionalMock = [
        {
            title: 'Calorías',
            cant: '182',
            udm: 'kcal'
        },
        {
            title: 'Carbohidratos',
            cant: '24.5',
            udm: 'g'
        },
        {
            title: 'Grasa total',
            cant: '6.2',
            udm: 'g'
        },
        {
            title: 'Proteína',
            cant: '4.8',
            udm: 'g'
        },
        {
            title: 'Sodio',
            cant: '115',
            udm: 'mg'
        },
        {
            title: 'Fibra',
            cant: '3.1',
            udm: 'g'
        }
    ];

    return (
        <div className="flex flex-column gap-24">
            <div className="flex ai-center gap-24 roof-sticky py-12 py-0_md">
                <Text className="roof-text-sticky pl-16 pl-0_md">
                    Informacion nutricional
                </Text>
                <Tooltip
                    toggleOn="click"
                    style={{ maxWidth: '198px' }}
                    content={
                        <span className="text-12 flex">
                            La información mostrada es una estimación en base a
                            los ingredientes y la preparación disponibles. No
                            debe considerarse un sustituto del consejo de un
                            nutricionista profesional.
                        </span>
                    }
                    classnames={{
                        container: 'flex',
                        tooltip:
                            'bg-secondary-positive text-light-1 text-12 border border-all border-thin border-light-100'
                    }}
                >
                    <Button variant="link" title="Mostrar tooltip">
                        <Icon size={24}>
                            <IconSprite name="info" fill="#B3B3B3" />
                        </Icon>
                    </Button>
                </Tooltip>
            </div>
            <Carousel type="nutricional">
                {infoNutricionalMock.map(({ title, cant, udm }) => (
                    <CardInfoNutricional
                        title={title}
                        cant={cant}
                        udm={udm}
                        key={title}
                    />
                ))}
            </Carousel>
        </div>
    );
}
