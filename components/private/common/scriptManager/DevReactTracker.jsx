import React from 'react';
import { IS_DEV } from 'fusion:environment';

const DevReactTracker = () => {
    const show = typeof IS_DEV === 'string' && IS_DEV === 'true';

    return show ? (
        <script src="https://cdn.jsdelivr.net/npm/react-render-tracker" />
    ) : (
        <></>
    );
};

export default DevReactTracker;
