import React, { useState, useEffect } from 'react';
import { SaleBox } from '../../foodit-global/common/saleBox/foodit';
import useGetUserConfig from '../../foodit-global/hooks/useGetUserConfig';

export default function HtmlFeature({ id: featureId }) {
    const { isSubscribed } = useGetUserConfig();
    const [showSaleBox, setShowSaleBox] = useState(true);

    useEffect(() => {
        if (isSubscribed) {
            setShowSaleBox(false);
        }
    }, [isSubscribed]);

    return showSaleBox && <SaleBox id={featureId} />;
}
