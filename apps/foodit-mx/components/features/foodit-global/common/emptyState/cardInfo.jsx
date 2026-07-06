import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Mediascroller } from '@ln/common-ui-mediascroller';
import { useAppContext } from 'fusion:context';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export const cardInfoArray = [
    {
        iconName: 'bookmark',
        title: 'Guardá tu receta favorita',
        description:
            'Podés guardar una o varias recetas a la vez creando colecciones para mantenerlas organizadas.' // Descripción
    },
    {
        iconName: 'shopping-list',
        title: 'Agregá ingredientes a la lista de compras',
        description:
            'Gestioná tu lista,  podés compartirla, copiarla o eliminarla en un solo click.'
    },
    {
        iconName: 'weekly-menu',
        title: 'Planificá tu semana',
        description:
            'Agregá recetas al menú semanal eligiendo día de la semana y tipo de comida.'
    }
];

function CardInfo() {
    const { layout, siteProperties } = useAppContext();
    const { layoutsName = {} } = siteProperties || {};

    const reorderedCardInfoArray = React.useMemo(() => {
        const [first, second, third, ...rest] = cardInfoArray;

        if (layout === layoutsName.FooditMenuSemanal) {
            return [third, first, second, ...rest];
        }

        if (layout === layoutsName.FooditListadoCompras) {
            return [second, first, third, ...rest];
        }

        return cardInfoArray;
    }, [layout, layoutsName]);

    return (
        <Mediascroller className="grid gap-16 gap-24_md --carousel-info">
            <Mediascroller.Track className="overflow-container jc-center_lg">
                {reorderedCardInfoArray.map(
                    ({ iconName, title, description }) => (
                        <div
                            key={title}
                            className="flex flex-column ai-center border border-all border-thin border-light-200 p-16 p-24_md p-32_lg gap-16 w-100 h-100"
                        >
                            <Icon size={32}>
                                <IconSprite name={iconName} critical />
                            </Icon>
                            <div className="flex flex-column text-center jc-center ai-center gap-4">
                                <Text className="prumo prumo-semibold text-20">
                                    {title}
                                </Text>
                                <Text className="roboto roboto-regular text-16 text-light-600">
                                    {description}
                                </Text>
                            </div>
                        </div>
                    )
                )}
            </Mediascroller.Track>
            <Mediascroller.Progress
                containerClassName="w-144 h-5 mx-auto bg-light-100 rounded-24"
                className="bg-primary-positive rounded-24 transition-linear"
            />
        </Mediascroller>
    );
}
export default CardInfo;
