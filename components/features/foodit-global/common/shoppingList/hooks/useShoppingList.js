import { useEffect, useState } from 'react';
import { ingredientsListMock } from '../helpers/ingredientsListMock';
import { getTypeOfDevice } from '@ln/hooks';

export const useShoppingList = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        // TODO: reemplazar el settimeout por el fetch
        setTimeout(() => {
            const isMobile =
                getTypeOfDevice({ breakpoints: { sm: 768 } }) === 'mobile';

            setIsMobile(isMobile);

            // TODO: hacer el fetch correspondiente y eliminar el mock
            const fetchedData = ingredientsListMock;
            setShoppingList(fetchedData);

            setLoading(false);
        }, 2000);
    }, []);

    return {
        loading,
        shoppingList,
        isMobile
    };
};
