/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import LoadingIcon from '../private/LN/common/loadingIcon';
import Text from '../private/common/text';
import redirectNota from '../private/common/utils/redirectNota';

function Emtpy(props) {
    const {
        children,
        globalContent: { redirectNotaAsp } = {},
        requestUri = ''
    } = props;
    const redirectUrl = redirectNota({
        redirect: redirectNotaAsp,
        requestUri
    });

    useEffect(() => {
        window.location.replace(redirectUrl);
    }, [redirectUrl]);

    if (redirectUrl) {
        return (
            <div id="wrapper" className="error404">
                <main>
                    <div className="lay">
                        <LoadingIcon />
                        <Text
                            font="arial"
                            extraClass="hlp-text-center"
                            weight="bold"
                            tag="h2"
                        >
                            Redirigiendo ...
                        </Text>
                    </div>
                </main>
            </div>
        );
    }
    return children;
}

Emtpy.sections = ['Cuerpo'];

export default Consumer(Emtpy);
