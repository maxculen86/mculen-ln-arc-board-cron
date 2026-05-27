import React from 'react';
import { useAppContext } from 'fusion:context';
import Image from '../../../features/ui/ln/image/default';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';

export function EmptyState() {
    const { contextPath, deployment } = useAppContext();

    const imgSrc = getAssetsPath(contextPath)(deployment)('emptyState.webp');
    return (
        <div className="flex flex-col justify-center items-center gap-24 text-base-default pt-64">
            <div className="w-100 bg-neutral-1">
                <Image
                    className="bg-neutral-1"
                    src={imgSrc}
                    alt="imagen sin resultados"
                />
            </div>
            <div className="flex flex-col gap-8 text-center">
                <p className="font-primary font-w-black text-subheading-md">
                    No se encontraron resultados
                </p>
                <p className="font-secondary text-18">
                    Intenta con otro término de búsqueda
                </p>
            </div>
        </div>
    );
}
