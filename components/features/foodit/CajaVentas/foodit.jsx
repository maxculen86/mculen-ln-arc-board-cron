import React from 'react';
import { SaleBox } from '../../foodit-global/common/saleBox/foodit';
import useGetUserData from '../../foodit-global/hooks/useGetUserData';

export default function HtmlFeature({ id: featureId }) {
    const { isSuscribed } = useGetUserData();
    if (isSuscribed) return <></>;
    return <SaleBox id={featureId} />;
}
