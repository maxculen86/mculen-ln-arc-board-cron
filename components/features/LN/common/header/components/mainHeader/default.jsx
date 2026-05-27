import React, { useState } from 'react';
import { Header as CommonHeader } from '@ln/ds-common-header';
import { cx } from '@ln/ds-cva';
import { wrapperMainHeaderVariants } from '../../styles';
import LeftOptions from './leftOptions/default';
import { useHeaderContext } from '../../context';
import RightOptions from './rightOptions/default';
import CenterOptions from './centerOptions/default';

function MainHeader() {
    const { position } = useHeaderContext();
    const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);

    const classGridSection = cx(
        'flex xl:justify-center items-center',
        isSearchInputOpen
            ? 'opacity-0 pointer-events-none w-1'
            : 'opacity-100 visible'
    );

    return (
        <CommonHeader.Col
            className={wrapperMainHeaderVariants({
                position
            })}
        >
            <CommonHeader.Grid>
                <CommonHeader.GridSection
                    position="left"
                    className="max-xl:hidden items-center gap-24"
                >
                    <LeftOptions
                        isOpen={isSearchInputOpen}
                        setIsOpen={setIsSearchInputOpen}
                    />
                </CommonHeader.GridSection>
                <CommonHeader.GridSection
                    position="center"
                    className={classGridSection}
                >
                    <CenterOptions />
                </CommonHeader.GridSection>
                <CommonHeader.GridSection
                    position="right"
                    className="flex justify-end h-40 xl:h-48"
                >
                    <RightOptions />
                </CommonHeader.GridSection>
            </CommonHeader.Grid>
        </CommonHeader.Col>
    );
}

export default MainHeader;
