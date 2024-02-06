import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { Text } from '@ln/common-ui-text';
import ShoppingList from '../../features/foodit-global/common/shoppingList/foodit';

const ListadoComprasFoodit = () => {
    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <section>
                    {/* {breadcrumb} */}
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
};

export default ListadoComprasFoodit;
