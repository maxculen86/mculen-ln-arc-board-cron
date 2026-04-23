import React from 'react';
import { cx } from '@ln/ds-cva';
import { Motion } from '@ln/ds-common-motion';
import List from '../../../ui/ln/list/default';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function IaSummary({
    isOpen = false,
    summaryData = [],
    onClose,
    className = ''
}) {
    if (!summaryData.length) return null;

    return (
        <Motion
            show={isOpen}
            animation={{
                duration: 300,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut'
            }}
        >
            <section
                aria-label="Resumen de lectura con IA"
                className={cx(
                    'bg-neutral-50 p-16 flex flex-col gap-16',
                    className
                )}
            >
                <div className="flex flex-col w-full">
                    {/* TODO: ACTUALIZAR TOKEN CORRECTO CON EL DS '--ia-tools' */}
                    <div className="flex items-center gap-8 text-[var(--ia-tools)] pb-2 border-b-2 border-[var(--ia-tools)] w-fit">
                        <Icon name="article" size={24} aria-hidden="true" />
                        <h2 className="text-20 font-bold">
                            Resumen de lectura
                        </h2>
                    </div>
                    <div className="ml-auto order-first">
                        <Button
                            variant="ghost"
                            color="secondary"
                            isIconOnly
                            aria-label="Cerrar resumen IA"
                            onClick={onClose}
                        >
                            <Icon name="close" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <List>
                    {summaryData.map(paragraph => (
                        <List.Item key={paragraph}>
                            <Icon name="bullet-filled" aria-hidden="true" />
                            <span
                                className="text-body-md"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: paragraph
                                }}
                            />
                        </List.Item>
                    ))}
                </List>
                <footer className="flex items-center gap-4">
                    <Icon
                        name="ia-star"
                        size={16}
                        type="color"
                        aria-hidden="true"
                    />
                    <span className="text-small-lg">
                        Realizado con Inteligencia Artificial
                    </span>
                </footer>
            </section>
        </Motion>
    );
}

export default IaSummary;
