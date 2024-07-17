import React, { useState, useEffect } from 'react';
import { SaleBox } from '../../foodit-global/common/saleBox/foodit';
import useGetUserData from '../../foodit-global/hooks/useGetUserData';

export default function HtmlFeature({ id: featureId }) {
    const { isSuscribed } = useGetUserData();
    const [showSaleBox, setShowSaleBox] = useState(true);

    useEffect(() => {
        if (isSuscribed) {
            setShowSaleBox(false);
        }
    }, []);

    return showSaleBox && <SaleBox id={featureId} />;
}
