import { useState, useCallback, useEffect } from 'react';

export default function useFetch(
    { url, options = {}, transform } = {},
    dependencies = []
) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const getData = useCallback(async () => {
        try {
            const resp = await fetch(url, options);

            if (resp.ok) {
                const response = await resp.json();
                const transformedData = transform
                    ? transform(response)
                    : response;
                setData(transformedData);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            setError(err);
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }, [url, options, transform]);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            const err = 'Debe definir una URL válida';
            setError({
                meessage: err
            });
            // eslint-disable-next-line no-console
            console.error(err);
        }
        url && getData();
    }, dependencies);

    return { data, loading, error };
}
