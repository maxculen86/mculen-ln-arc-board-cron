/* eslint-disable prettier/prettier */
import React, { useState, useEffect, Suspense, Fragment } from 'react';
import ImagePlaceholder from './imagePlaceholder';
import LoadingIcon from './loadingIcon';

const CajaCollection = React.lazy(() =>
    import('../../../chains/Ln_Caja_Collection/default')
);
const BannerRefactor = React.lazy(() =>
    import('../../../features/LN-common/bannerRefactor')
);

const componentsAllow = ['Ln_Caja_Collection'];

const bannersBloque2 = () => {
    return (
        <Suspense fallback={<ImagePlaceholder />}>
            <div class="row-gap-tablet-3 --ads">
                <BannerRefactor
                    customFields={{ group: 'acumulado', desktop: 'caja1_dsk' }}
                />
                <BannerRefactor
                    customFields={{ group: 'acumulado', desktop: 'caja2_dsk' }}
                />
                <BannerRefactor
                    customFields={{ group: 'acumulado', desktop: 'caja3_dsk' }}
                />
            </div>
        </Suspense>
    );
};

const findSection = (id, renderables) => {
    return (
        renderables.find(
            item => item.collection === 'sections' && item.props.id === id
        ) || {}
    );
};

const CargaEnBloqueLazy = props => {
    const [blocks, setBlocks] = useState([]);
    const [chainIndex, setChainIndex] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const { renderables = [], tree, idSection } = props;
    const section = findSection(idSection, renderables);
    const { children } = section;

    useEffect(() => {
        const prevIndex = Number(sessionStorage.getItem('homeBoxIndex')) || 0;
        [...Array(prevIndex)].forEach((_, i) => getCajaCollection(i));
        // getCajaCollection(chainIndex);
        window.addEventListener(`scroll${idSection}`, handleScroll);
        return () =>
            window.removeEventListener(`scroll${idSection}`, handleScroll);
    }, []);

    const handleScroll = () => {
        const scrollPercentRounded = getScrollPercent();
        if (chainIndex < children.length)
            sessionStorage.setItem('homePosition', window.pageYOffset);
        if (
            scrollPercentRounded < 70 ||
            isFetching ||
            chainIndex > children.length ||
            blocks.length >= children.length
        )
            return;
        setIsFetching(true);
    };

    const getCajaCollection = async index => {
        const chain = children[index];
        const { props: properties, type } = chain || {};
        const { customFields, id } = properties || {};
        if (index > children.length) return <></>;
        setChainIndex(chainIndex + 1);
        sessionStorage.setItem('homeBoxIndex', index);
        if (!componentsAllow.includes(type)) return <></>;
        if (blocks.length === 3) {
            setBlocks(state => [...state, bannersBloque2()]);
        }
        const caja = (
            <Suspense fallback={<ImagePlaceholder />}>
                <CajaCollection
                    id={id}
                    customFields={customFields}
                    renderables={renderables}
                    tree={tree}
                />
            </Suspense>
        );

        setBlocks(state => [...state, caja]);
    };

    useEffect(() => {
        if (!isFetching) return;
        getMoreCajaCollection();
    }, [isFetching]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const homePosition =
                Number(sessionStorage.getItem('homePosition')) || 1;
            window.scrollTo({ top: homePosition, behavior: 'smooth' });
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const getMoreCajaCollection = () => {
        getCajaCollection(chainIndex);
        setIsFetching(false);
    };

    return (
        <>
            {blocks.map((item, i) => (
                <Fragment key={i}>{item}</Fragment>
            ))}
            {isFetching && <LoadingIcon />}
        </>
    );
};

const getScrollPercent = () => {
    const docElem = document.documentElement;
    const bod = document.body;
    return (
        ((docElem.scrollTop || bod.scrollTop) /
            ((docElem.scrollHeight || bod.scrollHeight) -
                docElem.clientHeight)) *
        100
    );
};

export default CargaEnBloqueLazy;
