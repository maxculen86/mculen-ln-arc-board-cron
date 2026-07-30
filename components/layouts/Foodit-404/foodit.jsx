import React from 'react';
import BaseLayout from '../../features/foodit-global/common/BaseLayout/foodit';
import { EmptyStateDS } from '../../features/ui/foodit/emptyState/default';

function Foodit404() {
    return (
        <BaseLayout>
            <EmptyStateDS variant="404" />
        </BaseLayout>
    );
}

Foodit404.sections = ['Cuerpo'];

export default Foodit404;
