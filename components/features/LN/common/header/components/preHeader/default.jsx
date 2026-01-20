import React from 'react';
import Static from 'fusion:static';
import { Preheader as CommonPreHeader } from '@ln/ds-common-preheader';
import Weather from './components/Weather';
import Brands from './components/Brands';
// TODO: Ajustar eventos, se capturan con clases, deberiamos usar data-attributes para evitar que rompa al cambiar una clase presentacional.
import PreHeaderEventsScript from '../../../../../../private/common/scriptManager/PreHeaderEventsScript';

function PreHeader() {
    return (
        <Static id="pre-header">
            <CommonPreHeader containerClassName="hidden lg:flex">
                <Weather />
                <Brands />
            </CommonPreHeader>
            <PreHeaderEventsScript />
        </Static>
    );
}

export default PreHeader;
