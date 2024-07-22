import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import { Collapse, useCollapse } from '@ln/common-ui-collapse';
import classNames from 'classnames';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from './utils/addEventToDataLayer';
import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

const SummaryNote = ({ paragraphs = [], className }) => {
    const { collapsed, toggle } = useCollapse(true);

    if (!paragraphs.length) return null;

    const toggleText = collapsed ? 'Ver más' : 'Ver menos';

    const _classNames = classNames(
        'flex flex-column gap-16 border border-thin border-primary-ia border-left-solid_min512 pl-20_min512 cursor-pointer',
        className
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
        toggle();
    };

    return (
        <Collapse
            handleCollapse={handleCollapsedClick}
            className={_classNames}
            title={toggleText}
            data-testid="summary-note"
        >
            <Collapse.Header className="flex ai-center gap-6">
                <Icon size={24}>
                    <IconSprite name="summary" color />
                </Icon>
                <Text
                    as="h2"
                    className="--font-primary --font-medium --font-l text-neutral-light-800"
                    text="Resumen de la nota"
                />
            </Collapse.Header>
            <Collapse.Body collapsed={collapsed}>
                <ul className="flex flex-column --list-inherit gap-16 pl-32">
                    {paragraphs.map(paragraph => (
                        <li
                            key={paragraph}
                            className="--font-m --font-regular marker-26"
                            dangerouslySetInnerHTML={{
                                __html: paragraph
                            }}
                        />
                    ))}
                </ul>
                <div className="flex ai-center gap-8 pb-8">
                    <Icon size={16}>
                        <IconSprite name="iaGeneric" default fill="#FFFFFF" />
                    </Icon>
                    <Text
                        text="Realizado con Inteligencia Artificial"
                        className="text-light-600"
                    />
                </div>
            </Collapse.Body>
            <Collapse.Footer className="flex gap-4 ai-center">
                <Text
                    text={toggleText}
                    className="--font-regular --font-xs text-neutral-light-800"
                />
                <Icon size={16}>
                    <IconSprite
                        name="arrowDown"
                        default
                        className={collapsed ? '' : 'rotate-180'}
                    />
                </Icon>
            </Collapse.Footer>
        </Collapse>
    );
};

export default SummaryNote;
