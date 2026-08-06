import React from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import { Button } from '@ln/ds-common-button';
import { Formcontrol } from '@ln/ds-common-formcontrol';
import Icon from '../../../features/ui/foodit/icon/default';

export function FormContainer({
    isSessionExpired,
    requestLimit,
    disableInput,
    isTypingAnswer
}) {
    // El placeholder explica por qué NO se puede escribir, así que solo habla de
    // estados que además deshabilitan el campo. El error no está acá a
    // propósito: no bloquea (ver `disableInput`), y anunciarlo sobre un input
    // que funciona invita a no usarlo. Del error ya avisa el cartel de
    // `Thread.Error`, que es donde corresponde
    const getInputPlaceholder = () => {
        if (isSessionExpired) return 'Sesión expirada';
        if (isTypingAnswer) return 'Foodit está escribiendo…';
        return 'Continuá preguntándole a Foodit';
    };

    const classNamePlaceholder = disableInput
        ? 'placeholder:text-secondary-lighten'
        : 'placeholder:text-base-default';

    if (requestLimit) return null;

    return (
        <Thread.Input
            className="border-2 border-secondary-lighten text-base-default rounded-sm focus-within:ring-transparent"
            inputProps={{
                className: classNamePlaceholder,
                placeholder: getInputPlaceholder(),
                // El textarea solo mira `inputProps.disabled`: el `disabled` del root queda en el wrapper
                disabled: disableInput
            }}
            disabled={disableInput}
        >
            <Formcontrol.Adornment position="end" className="mt-auto">
                <Button
                    variant="ghost"
                    type="submit"
                    className="hover:bg-transparent"
                    disabled={disableInput}
                    isIconOnly
                >
                    <Icon
                        className="hover:text-accent-default"
                        name="send-ia"
                    />
                </Button>
            </Formcontrol.Adornment>

            <Formcontrol.Helpertext
                className="text-label-sm text-neutral-600"
                containerClassName="font-secondary"
            >
                Respuestas basadas en el contenido de Foodit. Te recomendamos
                verificar siempre las fuentes.
            </Formcontrol.Helpertext>
        </Thread.Input>
    );
}
