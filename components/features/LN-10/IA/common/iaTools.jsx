/* eslint-disable import/no-unresolved */
import React from 'react';
import { Horizontalscroller } from '@ln/common-ui-horizontalscroller';
import { CommonTabs as Tabs } from '@ln/common-ui-tabs';
import { Closebutton } from '@ln/common-ui-closebutton';
import PropTypes from 'prop-types';
import { IaTab } from './iaTab';
import { IaContent } from './iaContent';
import '../../../../../resources/packages/css/@ln/common-ui-tabs/index.css';
import '../../../../../resources/packages/css/@ln/common-ui-horizontalscroller/index.css';

export function IaTools({ iaData = [], handleClose = () => {} }) {
    if (!iaData?.length) return null;

    return (
        <div className="bg-neutral-light-50 p-16">
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
                defaultValue={iaData[0].id}
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
    );
}

IaTools.propTypes = {
    iaData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            callback: PropTypes.func.isRequired,
            data: PropTypes.arrayOf.isRequired
        })
    ).isRequired,
    handleClose: PropTypes.func
};

IaTools.defaultProps = {
    handleClose: () => {}
};

export default IaTools;
