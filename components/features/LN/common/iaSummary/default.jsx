import React from 'react';
import { cx } from '@ln/ds-cva';
// TODO: reemplazar Motion por AnimatePresence (lib en proceso de integración).
import { Motion } from '@ln/ds-common-motion';
import List from '../../../ui/ln/list/default';
import Divider from '../../../ui/ln/divider/default';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import { useIaSummaryState } from './hooks/useIaSummaryState';
import { useIaSummaryActions } from './hooks/useIaSummaryActions';

function IaSummary({ className = '', summaryData = [], onClose }) {
    const { isOpen } = useIaSummaryState();
    const { close } = useIaSummaryActions();

    // onClose emite el evento de cierre del trigger; fallback al close del store.
    const handleClose = onClose || close;

    if (!summaryData.length) return null;

    return (
        <div data-tw style={{ display: 'contents' }}>
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
                        'p-16 pb-24 flex flex-col rounded-8 shadow-[0_0_10px_4px_rgba(0,0,0,0.05)]',
                        className
                    )}
                >
                    <header className="flex w-full mb-8">
                        <div className="flex items-center gap-8">
                            <Icon
                                name="sparkling-filled"
                                size={16}
                                aria-hidden="true"
                                className="mb-6"
                            />
                            <h2 className="text-18 font-primary font-w-bold">
                                Resumen
                            </h2>
                        </div>
                        <Button
                            variant="ghost"
                            color="secondary"
                            size={32}
                            isIconOnly
                            className="ml-auto"
                            aria-label="Cerrar resumen"
                            onClick={handleClose}
                        >
                            <Icon name="close" aria-hidden="true" />
                        </Button>
                    </header>
                    <Divider className="mb-16" />
                    <List className="gap-y-16 mb-16">
                        {summaryData.map(paragraph => (
                            <List.Item key={paragraph}>
                                <Icon name="bullet-filled" aria-hidden="true" />
                                <span
                                    className="text-body-lg"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph
                                    }}
                                />
                            </List.Item>
                        ))}
                    </List>
                    <footer>
                        <span className="text-label-sm text-base-light">
                            Resumen realizado con IA
                        </span>
                    </footer>
                </section>
            </Motion>
        </div>
    );
}

export default IaSummary;
