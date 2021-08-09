/* eslint-disable no-shadow */

import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

const CommentsContext = React.createContext([{}, () => {}]);

const CommentsProvider = props => {
    const [state, setState] = useState({
        commentsEnabled: false,
        commentsCount: 0
    });

    const { children } = props;

    return (
        <CommentsContext.Provider value={[state, setState]}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export { CommentsContext, CommentsProvider };
