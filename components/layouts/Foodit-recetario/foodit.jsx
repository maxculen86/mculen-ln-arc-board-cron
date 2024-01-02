import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import DrawerRecetario from '../../features/foodit-global/common/drawerRecetario/foodit';
import CollectionBox from '../../features/foodit-global/common/collectionBox/foodit';
import RoofFoodit from '../../features/foodit-global/common/RoofFoodit/foodit';
import EmptyState from '../../features/foodit-global/common/emptyState/foodit';
import { Text } from '@ln/common-ui-text';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../private/common/utils/getAssetsPath';

// TODO: Estas secciones son a modo orientativo, pueden cambiar en base a definiciones de producto.
const pageBuilderSections = ['Apertura', 'Bloque-1'];

// TODO: Layout base, ira cambiando segun vaya avanzando el layout final
const RecetarioFoodit = ({ children }) => {
    const [opening, bloque1] = children;
    const { contextPath, deployment } = useAppContext();

    // TODO: Obtener data real de bookmarks
    const mock = {
        title: 'Colecciones',
        list: [
            { id: 'todas', text: 'Todas', quantity: 6 },
            { id: 'dulces', text: 'Dulces', quantity: 3 },
            { id: 'saladas', text: 'Saladas', quantity: 2 },
            { id: 'postres', text: 'Postres', quantity: 1 }
        ]
    };

    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section>
                    {/* TODO: Agregar breadcrumbs */}
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                    >
                        Mis recetas
                    </Text>
                </section>
                <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg">
                    <aside className="sm-none col-span-4 bg-background-positive p-24 p-32_lg">
                        <CollectionBox title={mock.title} list={mock.list} />
                    </aside>
                    <section className="col-span-8 col-span-12_lg">
                        <div className="floating-button-sentinel" />
                        <RoofFoodit title={{ text: 'Todas', as: 'h2' }} />
                        <div className="grid grid-cols-8 grid-cols-8_md grid-cols-12_lg gap-32">
                            {/* TODO: Mapeo de bookmarks con className='col-span-8 col-span-4_md' */}
                        </div>
                        {/* TODO: Si no hay resultados, mostrar el empty state */}
                        <EmptyState
                            title="Aún no hay nada por aca"
                            description="Comenzá a guardar el contenido que te gusta y accede muy fácil en cualquier momento"
                            imageProps={{
                                src: getAssetsPath(contextPath)(deployment)(
                                    'empty-state-recetario.webp'
                                ),
                                alt: 'No se encontraron resultados',
                                width: 147,
                                height: 151
                            }}
                        />
                    </section>
                </div>
            </div>
            <DrawerRecetario />
        </BaseLayout>
    );
};

RecetarioFoodit.sections = pageBuilderSections;

export default RecetarioFoodit;
