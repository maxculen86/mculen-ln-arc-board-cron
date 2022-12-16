/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import LoadingIcon from '../private/LN/common/loadingIcon';
import Text from '../private/common/text';
import redirectNota from '../private/common/utils/redirectNota';

const Emtpy = props => {
    const {
        children,
        globalContent: { redirectNotaAsp } = {},
        requestUri = ''
    } = props;
    const redirectUrl = redirectNota({
        redirect: redirectNotaAsp,
        requestUri
    });
    if (redirectUrl) {
        return (
            <>
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
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
        window.addEventListener('DOMContentLoaded', () => {
            window.location.replace("${redirectUrl}");
        })`
                    }}
                />
            </>
        );
    }
    return <>{children}</>;
};

Emtpy.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Emtpy.sections = ['Cuerpo'];

export default Consumer(Emtpy);
