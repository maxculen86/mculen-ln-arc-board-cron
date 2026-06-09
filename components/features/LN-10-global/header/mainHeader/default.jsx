import React, { useState } from 'react';
import { MainHeader } from '@ln/common-ui-header';
import { cx } from '@ln/ds-cva';
import { useHeaderContext } from '../context';
import { RightOptions } from './components/rightOptions';
import { LeftOptions } from './components/leftOptions';
import { CenterOptions } from './components/centerOptions';
import MainHeaderEventsScript from '../../../../private/common/scriptManager/MainHeaderEventsScript';

export function MainHeaderLN() {
    const {
        wrapperMainHeaderClassNames,
        mainHeaderClassNames,
        mainHeaderContentClassNames
    } = useHeaderContext();
    const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
    const classContentCenter = cx(
        'jc-start jc-center_lg ai-center transition-[opacity] duration-300',
        isSearchInputOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
    );

    return (
        <div className={wrapperMainHeaderClassNames}>
            <MainHeader className={mainHeaderClassNames}>
                <MainHeader.Content className={mainHeaderContentClassNames}>
                    <MainHeader.Content.Left className="flex jc-start ai-center lg-only gap-24">
                        <LeftOptions
                            isOpen={isSearchInputOpen}
                            setIsOpen={setIsSearchInputOpen}
                        />
                    </MainHeader.Content.Left>
                    <MainHeader.Content.Center className={classContentCenter}>
                        <CenterOptions />
                    </MainHeader.Content.Center>
                    <MainHeader.Content.Right className="flex jc-end ai-center gap-16 gap-24_md">
                        <RightOptions />
                    </MainHeader.Content.Right>
                    <MainHeaderEventsScript />
                </MainHeader.Content>
            </MainHeader>
        </div>
    );
}

export default MainHeaderLN;
