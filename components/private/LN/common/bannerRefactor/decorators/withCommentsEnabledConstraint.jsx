/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import useComments from '../../../../common/hooks/useComments';

export default Component => {
    const ref = React.createRef();

    return props => {
        const [show, setShow] = useState(false);
        const { commentsAllowed } = useComments();

        useEffect(() => {
            setShow(commentsAllowed);
        }, [commentsAllowed]);

        return <Component noShow withComments={show} {...props} ref={ref} />;
    };
};
