import React from 'react';
import { Header as CommonHeader } from '@ln/ds-common-header';
import { wrapperMainHeaderVariants } from '../../styles';
import LeftOptions from './leftOptions/default';
import { useHeaderContext } from '../../context';
import RightOptions from './rightOptions/default';
import CenterOptions from './centerOptions/default';

function MainHeader() {
    const { position, appearance } = useHeaderContext();

    return (
        <CommonHeader.Col
            className={wrapperMainHeaderVariants({
                position,
                appearance
            })}
        >
            <CommonHeader.Grid>
                <CommonHeader.GridSection
                    position="left"
                    className="max-xl:hidden items-center gap-24"
                >
                    <LeftOptions />
                </CommonHeader.GridSection>
                <CommonHeader.GridSection
                    position="center"
                    className="flex xl:justify-center items-center"
                >
                    <CenterOptions />
                </CommonHeader.GridSection>
                <CommonHeader.GridSection
                    position="right"
                    className="flex justify-end h-40"
                >
                    <RightOptions />
                </CommonHeader.GridSection>
            </CommonHeader.Grid>
        </CommonHeader.Col>
    );
}

export default MainHeader;
