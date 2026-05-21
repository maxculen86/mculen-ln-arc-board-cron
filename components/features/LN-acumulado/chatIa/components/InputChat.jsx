import React, { useState } from 'react';
import { Thread } from '@ln/ds-blocks-thread';
import { Formcontrol } from '@ln/ds-common-formcontrol';
import { cx } from '@ln/ds-cva';
import Button from '../../../../features/ui/ln/button/default';
import Icon from '../../../../features/ui/ln/icon/default';

export function InputChat({ isGenerating, disabled, isBlocked, isSubscribed }) {
    const [isEmpty, setIsEmpty] = useState(true);
    const isDisabled = disabled || isGenerating || isBlocked;
    const isSendDisabled = isDisabled || isEmpty;

    const classNameContainer = cx(
        'h-[92px] sm:h-[80px] border rounded-sm focus-within:border-accent-default hover:border-base-light',
        !isSubscribed || isBlocked
            ? 'border-base-lighten'
            : 'border-base-default'
    );

    return (
        <Thread.Input
            className={classNameContainer}
            inputProps={{
                className: cx(
                    'placeholder:text-body-md placeholder:font-secondary',
                    isDisabled
                        ? 'placeholder:text-neutral-300'
                        : 'placeholder:text-base-default/60'
                ),
                placeholder: isBlocked
                    ? ''
                    : 'Preguntá a la IA. ¿Qué querés saber acerca del mundial 2026 de la FIFA?',
                onInput: e => setIsEmpty(e.target.value.trim() === '')
            }}
            disabled={isDisabled}
        >
            <Formcontrol.Adornment className="-mr-[12px]" position="start">
                <Icon name="ia" size={20} className="text-[#27D2BE]" />
            </Formcontrol.Adornment>
            <Formcontrol.Adornment position="end" className="mt-auto">
                <Button
                    size="custom"
                    variant="ghost"
                    type="submit"
                    className="hover:bg-transparent -mb-8 -mr-8"
                    disabled={isSendDisabled}
                >
                    <Icon
                        name="send-normal"
                        size={20}
                        className={cx(
                            isSendDisabled
                                ? 'text-secondary-lighten'
                                : 'hover:text-accent-default text-base-default'
                        )}
                    />
                </Button>
            </Formcontrol.Adornment>
        </Thread.Input>
    );
}
