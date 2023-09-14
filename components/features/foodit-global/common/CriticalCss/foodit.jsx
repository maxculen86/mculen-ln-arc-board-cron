/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { FontFaceFoodit } from './FontFace';

// TODO: analizar convertir, el CSS generado en foodit-ui-sass a string y sumarlo al CriticalCSSString.
export const CriticalCSSString = ``;

const CriticalCSS = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `${FontFaceFoodit({
                    contextPath,
                    deployment
                })}${CriticalCSSString}`
            }}
        />
    );
};

export default CriticalCSS;
