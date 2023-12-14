import React from 'react';
import { Image as FooditImage } from '@ln/foodit-ui-image';
import Epigraph from '../../common/epigraph/foodit';

export const Image = ({ data, withZoom, insideBody, outputType }) => {
    return (
        <figure className="flex flex-column gap-8">
            <FooditImage // TODO: Validar props necesarias
                // mediaData={data}
                // withZoom={withZoom}
                // colNumber={12}
                // handleClick={handleClick}
                // active={active}
                // outputType={outputType}
                // insideBody={insideBody}
                className="w-100 ratio-3-2"
                src={data.url}
            />
            {data && (
                // TODO: Obtener credits
                <Epigraph credits={'CREDITS'} caption={data.caption} />
            )}
        </figure>
    );
};

export default Image;
