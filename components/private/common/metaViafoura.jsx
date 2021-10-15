import React from 'react';
import PropTypes from 'prop-types';
import get from './utils/get';
import { allowComments } from './utils/commentsHelper';

const MetaViafoura = props => {
    return (
        (allowComments(props) && (
            <>
                <meta
                    name="vf:container_id"
                    content={get(props, 'globalContent._id')}
                />
                <meta name="vf:lang" content="es" />
            </>
        )) || <></>
    );
};

MetaViafoura.propTypes = {
    globalThis: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string
    }).isRequired
};

export default MetaViafoura;
