/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';

export default function CajaFooditEventScript() {
    const { contextPath, deployment } = useAppContext();

    return (
        <script
            defer
            id="script-caja-foodit"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptDataLayerCajaFoodit.min.js`
            )}
        />
    );
}
