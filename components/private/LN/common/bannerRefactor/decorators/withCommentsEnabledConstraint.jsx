/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import useGlobal from '../../../../common/hooks/useGlobal';

export default Component => {
    const ref = React.createRef();

    return props => {
        const [show, setShow] = useState(false);
        const { commentsAllowed } = useGlobal();

        useEffect(() => {
            setShow(commentsAllowed);
        }, [commentsAllowed]);

        return show && <Component {...props} ref={ref} />;
    };
};
