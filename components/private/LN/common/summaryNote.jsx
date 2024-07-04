import React, { useState } from 'react';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from './utils/addEventToDataLayer';

const SummaryNote = ({ paragraphs = [], className }) => {
    if (!paragraphs.length) return <></>;

    const [collapsed, setCollapsed] = useState(true);

    const toggleText = collapsed ? 'Ver más' : 'Ver menos';
    const _classNames = classNames(
        'flex flex-column gap-16 border border-thin border-primary-ia border-left-solid_min512 pl-20_min512 cursor-pointer',
        className
    );
    const drawerChildClass = classNames(
        'flex flex-column gap-16 relative difumination',
        collapsed ? 'pb-170 pb-125_min1024' : 'pb-0'
    );

    const handleCollapsedClick = () => {
        if (collapsed) {
            addEventToDataLayer({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'resumen_nota'
            });
        }
    };

    return (
        <section
            className={_classNames}
            data-testid="summary-note"
            title={toggleText}
            onClick={() => {
                setCollapsed(collapsed => !collapsed);
                handleCollapsedClick();
            }}
        >
            <div className="flex ai-center gap-6">
                <IconSprite name="summary" color />
                <Text
                    as="h2"
                    className="--font-primary --font-medium --font-l text-neutral-light-800"
                    text="Resumen de la nota"
                />
            </div>
            <div className="grid-drawer" data-collapsed={collapsed}>
                <div className={drawerChildClass} data-difumination={collapsed}>
                    <ul className="flex flex-column pl-32 gap-16 --list-inherit">
                        {paragraphs.map((paragraph, i) => (
                            <li
                                className="--font-m --font-regular marker-26"
                                key={i}
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                            />
                        ))}
                    </ul>
                    <div className="flex ai-center gap-8 pb-8">
                        <IconSprite
                            name="iaGeneric"
                            default
                            width={16}
                            height={16}
                            fill="#FFFFFF"
                        />
                        <Text
                            text="Realizado con Inteligencia Artificial"
                            className="text-light-600"
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 ai-center">
                <Text
                    text={toggleText}
                    className="--font-regular --font-xs text-neutral-light-800"
                />
                <IconSprite
                    name="arrowDown"
                    default
                    width={16}
                    height={16}
                    className={collapsed ? '' : 'rotate-180'}
                />
            </div>
        </section>
    );
};

export default SummaryNote;
