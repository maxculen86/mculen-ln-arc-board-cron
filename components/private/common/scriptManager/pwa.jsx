import React from 'react';
import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';

class Pwa extends React.Component {
    constructor(props) {
        super(props);

        const { config, location = 'head' } = props;
        this.location = location;
        this.config = config;
    }

    render() {
        const { deployment, layout } = this.props;
        const { layoutsName } = getProperties('la-nacion-ar');

        if (layout !== layoutsName.Home) return <></>;

        return (
            <script
                id="pwaScript"
                deployment={deployment.value}
                src={deployment(`/pf/resources/register.js`)}
            />
        );
    }
}

Pwa.propTypes = {
    deployment: PropTypes.func.isRequired,
    location: PropTypes.string,
    layout: PropTypes.string.isRequired
};

Pwa.defaultProps = {
    location: 'head'
};

export default Consumer(Pwa);
