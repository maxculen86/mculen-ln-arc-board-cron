import React from 'react';
import PropTypes from 'prop-types';

function NotaBody({ children }) {
    return (
        <section className="nota-cards__body">
            <div className="lay-container">
                <div className="cuerpo__nota">{children}</div>
            </div>
        </section>
    );
}

NotaBody.propTypes = {
    children: PropTypes.node
};

NotaBody.defaultProps = {
    children: null
};

export default NotaBody;
