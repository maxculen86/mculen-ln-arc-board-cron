import { useState, useCallback, useEffect } from 'react';

export default function useFetch(
    { url, options = {}, transform } = {},
    dependencies = []
) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setError('err');
            console.error(err);
        }
    }, [url, options, transform]);

    useEffect(() => {
        url && getData();
    }, dependencies);

    return [data, loading, error];
}
