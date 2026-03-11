/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import classNames from 'classnames';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';

// TODO: reemplazar por @ln/common-ui-accordion
function Accordion({ children, text = '' }) {
    const [openList, setOpenList] = useState(false);
    const handleAccordionStatus = () => {
        setOpenList(!openList);
    };

    return (
        <div className={classNames('accordion', !openList && 'mb-24')}>
            <div className="action flex jc-between ai-center w-100 rounded-4 p-16 border border-all border-thin border-light-300">
                <span
                    className="--twoxs"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <Button
                    onClick={handleAccordionStatus}
                    title={openList ? 'Cerrar' : 'Abrir'}
                    size="inherit"
                    iconOnly
                >
                    <Icon
                        size={20}
                        className={classNames(
                            openList &&
                                'rotate-180 transition transition-all transition-duration-250'
                        )}
                    >
                        <IconSprite name="arrowDown" fill="#0250c9" />
                    </Icon>
                </Button>
            </div>
            {openList && (
                <div className="flex flex-column gap-16 py-16">{children}</div>
            )}
        </div>
    );
}

export default Accordion;
