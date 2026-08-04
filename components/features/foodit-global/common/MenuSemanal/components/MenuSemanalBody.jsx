import React from 'react';
import { Accordion } from '@ln/common-ui-accordion';
import { Text } from '@ln/common-ui-text';
import { Badge } from '@ln/foodit-ui-badge';
import { Image } from '@ln/foodit-ui-image';
import { Link } from '@ln/foodit-ui-link';
import { MenuOptions } from './MenuOptions/MenuOptions';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { getVariantBarrier } from '../../emptyState/helpers';
import useGetUserConfig from '../../../hooks/useGetUserConfig';
import { menusDayTransform } from '../helpers/_helper';
import { EmptyStateDS } from '../../../../ui/foodit/emptyState/default';

function MenuSemanalBody({
    weeklyMenu,
    setWeeklyMenu,
    menusDay,
    subscription
}) {
    const { userType } = useGetUserConfig();

    const menuDatas = menusDayTransform(menusDay);

    return (
        <>
            {menuDatas.map((menu, i) => (
                <Accordion
                    key={menu.id}
                    visible={i === 0}
                    className="border border-all border-light-100 border-secondary-positive__hover border-thin rounded-4 px-16 px-24_md px-32_lg py-12 py-16_lg rounded-4 mb-24"
                >
                    <Accordion.Header icon={<IconSprite name="arrow-down" />}>
                        <div className="flex jc-start ai-start w-100 order-1">
                            <Text
                                as="p"
                                className="text-24 text-32_md text-36_lg prumo prumo-light"
                            >
                                {menu.category}
                            </Text>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body
                        className="flex flex-column"
                        style={{ overflow: 'visible' }}
                    >
                        <div className="pt-24">
                            {menu.recipes.length > 0 ? (
                                <table className="w-100">
                                    <tbody>
                                        {menu.recipes.map(
                                            ({
                                                bookmarkId,
                                                image,
                                                id,
                                                title,
                                                badge,
                                                url
                                            }) => (
                                                <tr
                                                    key={id}
                                                    className="flex ai-center jc-between border border-bottom border-thin border-light-100"
                                                >
                                                    <td className="flex ai-center w-450_md w-600_lg gap-32 py-12 px-16">
                                                        <Image
                                                            className="w-40 w-56_lg ratio-1-1 sm-none"
                                                            src={image}
                                                        />
                                                        <Link
                                                            href={url}
                                                            title={`Ir a ${title}`}
                                                            className="underline prumo prumo-semibold text-18"
                                                        >
                                                            {title}
                                                        </Link>
                                                    </td>
                                                    <td className="sm-none flex w-150_md text-center ai-center jc-center">
                                                        {badge && (
                                                            <Badge>
                                                                {badge}
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="py-12 px-16">
                                                        <MenuOptions
                                                            articleId={id}
                                                            bookmarkId={
                                                                bookmarkId
                                                            }
                                                            weeklyMenu={
                                                                weeklyMenu
                                                            }
                                                            setWeeklyMenu={
                                                                setWeeklyMenu
                                                            }
                                                            subscription={
                                                                subscription
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <EmptyStateDS
                                    variant={getVariantBarrier(userType)}
                                />
                            )}
                        </div>
                    </Accordion.Body>
                </Accordion>
            ))}
        </>
    );
}
export default MenuSemanalBody;
