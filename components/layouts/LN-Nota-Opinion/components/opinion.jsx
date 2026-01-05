import React from 'react';
import { BaseLayout } from '../../../features/LN-10-global/common/baseLayout/default';

function Opinion({ children }) {
    return (
        <BaseLayout>
            <main id="content">{children}</main>
        </BaseLayout>
    );
}

export default Opinion;
