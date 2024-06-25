/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
import './test.scss';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';

const SummaryNote = ({ paragraphs = [], collapsed = true, className }) => {
    if (!paragraphs.length) return <></>;

    const toggleText = collapsed ? 'Ver más' : 'Ver menos';
    const _classNames = classNames(
        'flex flex-column gap-16 border border-thin border-primary-ia border-left-solid_min512 pl-20_min512',
        className
    );

    return (
        <section className={_classNames} data-testid="summary-note">
            <div className="flex ai-center gap-6">
                <IconSprite name="summary" color />
                <Text
                    as="h2"
                    className="--font-primary --font-medium --font-l text-neutral-light-800"
                    text="Resumen de nota"
                />
            </div>
            <div className="grid-drawer" data-collapsed={collapsed}>
                <div
                    className="flex flex-column gap-16 pb-16 relative difumination pb-170 pb-125_min1024"
                    data-difumination={collapsed}
                >
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
