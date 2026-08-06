import React from 'react';
import { ButtonNavigation } from './buttonNavigation';

export function SessionEnd({ isSessionCompleted, requestLimit }) {
    return (
        <div className="flex flex-col gap-16" role="status" aria-live="polite">
            {isSessionCompleted && (
                <p className="roboto roboto-bold text-16 pl-4 pt-16 md:pl-[94px]">
                    Espero haberte ayudado. Si querés podés comenzar una nueva
                    búsqueda.
                </p>
            )}
            <ButtonNavigation requestLimit={requestLimit} />
        </div>
    );
}
