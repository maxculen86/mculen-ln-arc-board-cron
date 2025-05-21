import React from 'react';
import { Text } from '@ln/common-ui-text';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import BreadcrumbCustomFoodit from '../../features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';
import { WeeklyMenu } from '../../features/foodit-global/common/MenuSemanal/foodit';
import { ModalRemoveIngredient } from '../../features/foodit-global/common/Modals/RemoveIngredients/foodit';

function MenuSemanal() {
    return (
        <BaseLayout>
            <div className="flex flex-column gap-32">
                <div>
                    <BreadcrumbCustomFoodit
                        className="mb-24"
                        sectionsCustom={[
                            {
                                name: 'Mi Menú Semanal',
                                url: '/mi-menu-semanal/'
                            }
                        ]}
                    />
                    <Text
                        as="h1"
                        className="prumo prumo-semibold text-28 text-40_md text-48_lg"
                    >
                        Mi Menú Semanal
                    </Text>
                </div>
                <WeeklyMenu />
                <ModalRemoveIngredient />
            </div>
        </BaseLayout>
    );
}

export default MenuSemanal;
