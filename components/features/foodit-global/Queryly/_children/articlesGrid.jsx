import React, { useContext, useMemo, useState } from 'react';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Button } from '@ln/common-ui-button';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import { useDrawer } from '@ln/common-ui-drawer';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { useWindowSize } from '@ln/hooks';
import CommonCardFoodit from '../../common/CommonCardFoodit/foodit';
import { LoadMoreButton } from '../../../foodit/GrillaNotasAcu/helpers/loadMoreButton';
import { getVariantBySubtype } from '../../common/utils/notaFooditHelper';
import { getTag } from '../_helpers';
import { SearchContext } from './searchContext';
import { SkeletonResultdata } from '../../common/skeletons/Buscador/resultdata';
import { DRAWER } from '../../common/DrawerContainer/constants';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import DrawerBuscador from './drawerBuscador';
import { RECETA } from '../../../../private/common/utils/subtypes/subtypeHelper';

export default function ArticlesGrid() {
    const {
        data: { articlesGrid = [], total } = {},
        loading,
        getNextPage = () => {},
        query,
        sort,
        setSort,
        resetPage
    } = useContext(SearchContext);

    const { toggleDrawer } = useDrawer({ id: DRAWER.BUSCADOR });
    const { width } = useWindowSize();
    const isMobile = useMemo(() => width !== 0 && width < 1280, [width]);
    const [selectedId, setSelectedId] = useState('relevance');

    const handleSortChange = newSortValue => {
        setSelectedId(newSortValue);
        setSort(newSortValue);
        resetPage();
    };

    const renderItems = [
        {
            key: 'mas-relevantes',
            text: 'MÁS RELEVANTES',
            variant: 'default',
            type: 'button',
            className: 'text-accent-lechuga__hover',
            onClick: () => handleSortChange('relevance')
        },
        {
            key: 'mas-actuales',
            text: 'MÁS ACTUALES',
            variant: 'default',
            type: 'button',
            className: 'text-accent-lechuga__hover',
            onClick: () => handleSortChange('date')
        }
    ];

    return (
        <section
            id="resultdata"
            className="col-span-8 col-span-12_md col-span-12_lg"
        >
            {articlesGrid.length > 0 && (
                <div className="flex flex-column flex-row_md jc-between gap-24 pb-24">
                    <div
                        className="text-24 text-28_md prumo prumo-light text-light-800"
                        id="results_count"
                    >
                        <span className="prumo prumo-medium">{total}</span>{' '}
                        resultados de: {query}
                    </div>
                    <div className="flex ai-center gap-8">
                        <div className="flex lg-none gap-8">
                            <Button
                                onClick={toggleDrawer}
                                id="btn-toggle-filter"
                                variant="secondary"
                                className="text-light-800 text-14 roboto-bold inline-flex ai-center gap-8"
                            >
                                <Icon size={16}>
                                    <IconSprite name="filter" />
                                </Icon>
                                <Text className="text-12">Filtrar</Text>
                            </Button>

                            {isMobile && (
                                <DrawerBuscador toggleDrawer={toggleDrawer} />
                            )}

                            <hr className="min-h-14 border border-light-800" />
                        </div>

                        <div className="flex ai-center gap-8">
                            <Text className="text-14 min-w-fit">
                                Ordenar por:
                            </Text>
                            <Dropdown className="flex cursor-pointer">
                                <Dropdown.Toggle className="text-light-800 text-12 roboto-bold">
                                    <Button
                                        variant="secondary"
                                        title="ver opciones"
                                    >
                                        <Text>
                                            {sort === 'relevance'
                                                ? 'MÁS RELEVANTES'
                                                : 'MÁS ACTUALES'}
                                        </Text>
                                    </Button>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    alignment="right"
                                    className="bg-light-1 p-24 min-w-209 rounded-4 shadow-center"
                                >
                                    {renderItems.map(item => (
                                        <Itemcard
                                            key={item.key}
                                            text={item.text}
                                            variant={item.variant}
                                            type={item.type}
                                            className={item.className}
                                            onClick={item.onClick}
                                            selected={
                                                selectedId ===
                                                (item.key === 'mas-relevantes'
                                                    ? 'relevance'
                                                    : 'date')
                                            }
                                        />
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )}
            {loading && <SkeletonResultdata />}
            <section className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32 mb-32">
                {articlesGrid.map(
                    (
                        {
                            guid,
                            counter_time: counterTime,
                            creator,
                            link,
                            title,
                            subtype,
                            promo_image: promoImage,
                            video_jw: videoJw,
                            section
                        } = {},
                        index = 0
                    ) => (
                        <CommonCardFoodit
                            key={guid}
                            className="col-span-4"
                            articleId={guid}
                            time={counterTime}
                            fetchPriority={
                                index <= 1 && subtype === RECETA
                                    ? 'high'
                                    : 'low'
                            }
                            loading={
                                index <= 1 && subtype === RECETA
                                    ? 'eager'
                                    : 'lazy'
                            }
                            size="small"
                            author={creator}
                            tag={getTag(section)}
                            showTime={Boolean(counterTime)}
                            hasVideo={Boolean(videoJw)}
                            src={promoImage}
                            alt={title}
                            title={title}
                            sources={[]}
                            linksProps={{ href: link, title }}
                            variant={getVariantBySubtype(subtype)}
                        />
                    )
                )}
            </section>
            {articlesGrid &&
                articlesGrid.length >= 24 &&
                articlesGrid.length < total && (
                    <LoadMoreButton clickMoreArticle={getNextPage} />
                )}
        </section>
    );
}
