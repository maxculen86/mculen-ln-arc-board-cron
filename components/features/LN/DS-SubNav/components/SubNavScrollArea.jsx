import React from 'react';
import Static from 'fusion:static';
import { cx } from '@ln/ds-cva';
import ScrollArea from '../../../ui/ln/scrollArea/default';
import Link from '../../../ui/ln/link/default';
import Icon from '../../../ui/ln/icon/default';
import { bulletVariants } from '../styles';

function SubNavScrollArea({ navigation = [], brand = 'none' }) {
    const bulletClass = bulletVariants({ brand });
    return (
        <ScrollArea arrowSize={16}>
            <Static id="scroll-area-subnav">
                <ul className="flex items-center">
                    {navigation.map((item, index) => {
                        const { key, link, textname, title } = item;
                        return (
                            <li key={key} className="item flex items-center">
                                {index > 0 && (
                                    <Icon
                                        name="bullet-filled"
                                        size={16}
                                        className={cx('mx-8', bulletClass)}
                                    />
                                )}
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
            </Static>
        </ScrollArea>
    );
}

export default SubNavScrollArea;
