/* eslint-disable react/prop-types */
import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import LoadingIcon from '../private/LN/common/loadingIcon';
import Text from '../private/common/text';
import getQueryParamValue from '../private/common/utils/getQueryParamValue';

const Emtpy = props => {
    const { children, globalContent, requestUri } = props;
    if (globalContent.redirectNotaAsp) {
        if (typeof window === 'undefined') {
            return <></>;
        }
        const queryObt = getQueryParamValue(
            'nota_id',
            SITE_LANACION + requestUri
        );
        window.location.replace(
            `${SITE_LANACION}/${queryObt.replace('/', '')}`
        );
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
    return <>{children}</>;
};

Emtpy.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired
};

Emtpy.sections = ['Cuerpo'];

export default Consumer(Emtpy);
