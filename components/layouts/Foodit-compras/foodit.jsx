import React from 'react';
import { Text } from '@ln/common-ui-text';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import ShoppingList from '../../features/foodit-global/common/shoppingList/foodit';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';

function ListadoComprasFoodit() {
    return (
        <BaseLayout>
            <div className="flex flex-column gap-32 relative min-h-50dvh">
                <section className="flex flex-column">
                    <BreadcrumbCustomFoodit
                        className="mb-24"
                        sectionsCustom={[
                            {
                                name: 'Lista de compras',
                                url: '/listado-compras/'
                            }
                        ]}
                    />
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                    >
                        Mi lista de compras
                    </Text>
                    <div className="floating-button-sentinel" />
                </section>
                <ShoppingList />
            </div>
        </BaseLayout>
    );
}

ListadoComprasFoodit.sections = ['Cuerpo'];

export default ListadoComprasFoodit;
