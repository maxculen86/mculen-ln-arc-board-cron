import React, { useState, useEffect, Suspense, Fragment } from 'react';
import ImagePlaceholder from './imagePlaceholder';
import LoadingIcon from './loadingIcon';

const CajaCollection = React.lazy(() => import('../../../chains/Ln_Caja_Collection'));

const CargaEnBloqueLazy = props => {
    const [blocks, setBlocks] = useState([]);
    const [chainIndex, setChainIndex] = useState(0);
	const [isFetching, setIsFetching] = useState(false);
    const { renderables = [], tree } = props;
    const section = renderables[7];
    const { children } = section;

	useEffect(() => {
		const prevIndex = Number(sessionStorage.getItem('homeBoxIndex')) || 0;
		[...Array(prevIndex)].forEach((_, i) => getCajaCollection(i));
		//getCajaCollection(chainIndex);
		window.addEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		const scrollPercentRounded = getScrollPercent();
		sessionStorage.setItem('homePosition', window.pageYOffset);
		if (scrollPercentRounded < 70 || isFetching) return;
		setIsFetching(true);
		
		
	};

	const getCajaCollection = async index => {
		if (index > children.length) return <></>;
        const chain = children[index];
        const { props: properties, type } = chain || {};
        const { customFields, id } = properties || {};
		setChainIndex(chainIndex + 1);
		sessionStorage.setItem('homeBoxIndex', chainIndex + 1);
        if (type !== 'Ln_Caja_Collection') return <></>;
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
			const homePosition = Number(sessionStorage.getItem('homePosition')) || 1;
			window.scrollTo({top: homePosition, behavior: 'smooth'});
		}, 3000);
		return () => clearTimeout(timer);
	  }, []);

	const getMoreCajaCollection = () => {
		getCajaCollection(chainIndex);
		setIsFetching(false);
	};

	return (
		<>
			{blocks.map((item, i) => (
				<Fragment key={i}>
                    {item}
				</Fragment>
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
