import React, { useEffect, useRef, useState } from 'react';
import { cx } from '@ln/ds-cva';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import { bulletVariants } from '../styles';

const ROW_HEIGHT = 28; // px por fila del wrap
const COLLAPSED_ROWS = 2;
const COLLAPSED_MAX_HEIGHT = ROW_HEIGHT * COLLAPSED_ROWS;

function SubNavCollapsible({ navigation = [], brand = 'none' }) {
    const contentRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [canToggle, setCanToggle] = useState(false);
    const [fullHeight, setFullHeight] = useState(0);

    const bulletClass = bulletVariants({ brand });
    // Clave estable del contenido: cambia solo si cambia el set de items, no en
    // cada render (categories se rearma con identidad nueva). Evita recrear el
    // ResizeObserver innecesariamente.
    const navKey = navigation.map(item => item.key).join('|');

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return undefined;

        const measure = () => {
            const full = content.offsetHeight;
            setFullHeight(full);
            setCanToggle(full > COLLAPSED_MAX_HEIGHT + 1);
        };

        measure();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', measure);
            return () => window.removeEventListener('resize', measure);
        }
        const observer = new ResizeObserver(measure);
        observer.observe(content);
        return () => observer.disconnect();
    }, [navKey]);

    return (
        <div className="flex items-start gap-8">
            <div
                className="flex-1 overflow-hidden transition-[max-height] duration-300 ease-in-out motion-reduce:transition-none"
                style={{
                    maxHeight: isExpanded ? fullHeight : COLLAPSED_MAX_HEIGHT
                }}
            >
                <ul ref={contentRef} className="flex flex-wrap -ml-32">
                    {navigation.map(item => {
                        const { key, link, textname, title } = item;
                        return (
                            <li
                                key={key}
                                className="relative flex items-center h-28 ml-32"
                            >
                                <Icon
                                    name="bullet-filled"
                                    size={16}
                                    className={cx(
                                        'absolute -left-24 top-1/2 -translate-y-1/2',
                                        bulletClass
                                    )}
                                />
                                <Link
                                    href={link}
                                    title={title}
                                    color="black"
                                    className="whitespace-nowrap"
                                >
                                    {textname}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="w-24 shrink-0 flex justify-center">
                {canToggle && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(value => !value)}
                        aria-expanded={isExpanded}
                        aria-label={
                            isExpanded
                                ? 'Ver menos secciones'
                                : 'Ver más secciones'
                        }
                    >
                        <Icon
                            name="arrow-down"
                            size={12}
                            className="transition-transform duration-200 bg-muted"
                            style={{
                                transform: isExpanded
                                    ? 'rotate(180deg)'
                                    : 'none'
                            }}
                            hasWrapper
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SubNavCollapsible;
