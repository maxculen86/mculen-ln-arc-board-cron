import React from 'react';
import { useAppContext } from 'fusion:context';
import { Horizontalscroller } from '@ln/common-ui-horizontalscroller';
import { CommonTabs as Tabs } from '@ln/common-ui-tabs';
import { Closebutton } from '@ln/common-ui-closebutton';
import { Motion } from '@ln/common-ui-motion';
import IaTab from './iaTab';
import IaContent from './iaContent';
import useIaVisibility from '../hooks/useIaVisibility';
import ContainerValidation from '../../../../private/common/containerValidation';

import '../../../../../resources/packages/css/@ln/common-ui-tabs/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-horizontalscroller/index.css';

export function IaTools({ iaData = [] }) {
    const { layout } = useAppContext();
    const { isOpen, containerIaToolsRef, handleClose } = useIaVisibility();

    if (!isOpen || !iaData.length) return null;

    // TODO: eliminar <ContainerValidation> cuando se implemente el refactor del layout foto al 100%
    return (
        <ContainerValidation layout={layout}>
            <Motion
                show={isOpen}
                animation={{
                    transitionIn: ['fade-in'],
                    transitionOut: ['fade-out'],
                    duration: 300
                }}
            >
                <div
                    className="bg-neutral-light-50 p-16 mb-16 mb-24_m"
                    ref={containerIaToolsRef}
                >
                    <div className="flex jc-end pb-8">
                        <Closebutton
                            onClick={handleClose}
                            id="closeButtonIA"
                            type="button"
                            aria-label="Close"
                            className="button ln-button"
                            iconProps={{
                                className: 'icon-close',
                                color: 'dark'
                            }}
                        />
                    </div>
                    <Tabs
                        defaultValue={iaData[0]?.id}
                        className="gap-16"
                        selectedColor="var(--ia-tools)"
                    >
                        <Tabs.ItemContainer className="gap-12">
                            <Horizontalscroller
                                classnames={{
                                    button: 'bg-neutral-light-50'
                                }}
                            >
                                {iaData.map(({ id, title, callback }) => (
                                    <Tabs.Item
                                        className="flex ai-center gap-4 text-wrap cursor-pointer"
                                        id={id}
                                        key={id}
                                        onClick={callback}
                                    >
                                        <IaTab id={id} title={title} />
                                    </Tabs.Item>
                                ))}
                            </Horizontalscroller>
                        </Tabs.ItemContainer>
                        {iaData?.map(({ id, data }) => (
                            <Tabs.Panel id={id} key={id}>
                                <IaContent id={id} contentData={data} />
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                </div>
            </Motion>
        </ContainerValidation>
    );
}

export default IaTools;
