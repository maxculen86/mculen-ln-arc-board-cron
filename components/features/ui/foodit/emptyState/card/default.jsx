import React from 'react';
import { useAppContext } from 'fusion:context';
import Icon from '../../icon/default';
import { MediaScroller } from '../../mediaScroller/default';

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

    const responsive = {
        base: { columns: 4, span: 3 },
        md: { columns: 9, span: 3 },
        xl: { columns: 12, span: 4 }
    };

    return (
        <MediaScroller className="flex justify-center" responsive={responsive}>
            {reorderedCardInfoArray.map(({ iconName, title, description }) => (
                <div
                    key={title}
                    className="text-primary-default flex flex-col items-center border border-neutral-200 p-16 md:p-24 xl:p-32 gap-16 w-full h-full"
                >
                    <Icon size={32} name={iconName} type="critical" />

                    <div className="flex flex-col text-center justify-center items-center gap-4">
                        <p
                            className="font-primary font-semibold text-18"
                            style={{ '--vf-wght': 130 }}
                        >
                            {title}
                        </p>
                        <p className="font-secondary font-regular text-16 text-secondary-default">
                            {description}
                        </p>
                    </div>
                </div>
            ))}
        </MediaScroller>
    );
}
export default CardInfo;
