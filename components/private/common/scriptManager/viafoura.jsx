import React from 'react';
import PropTypes from 'prop-types';
import { allowComments } from '../utils/commentsHelper';

function Viafoura(props) {
    const { location = 'body-bottom' } = props;
    return (
        location === 'body-bottom' &&
        allowComments(props) && (
            <script
                type="text/javascript"
                async
                src="//cdn.viafoura.net/vf-v2.js"
            />
        )
    );
}

Viafoura.propTypes = { location: PropTypes.string.isRequired };

export default Viafoura;
