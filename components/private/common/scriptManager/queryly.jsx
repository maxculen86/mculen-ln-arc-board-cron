/* eslint-disable react/no-danger */
import React from 'react';

// TODO: Deprecated component (ahora se llama al hacer click al boton buscar)
export default class Queryly extends React.Component {
    constructor(props) {
        super(props);

        const { config, location = 'body-bottom' } = props;

        this.location = location;
        this.config = config;
    }

    render() {
        return (
            <>
                <script src="//www.queryly.com/js/queryly.v4.js" />
                <script
                    defer
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html:
                            "queryly.init('8075c0c1c4c44847', document.querySelectorAll('#fusion-app'));"
                    }}
                />
            </>
        );
    }
}
