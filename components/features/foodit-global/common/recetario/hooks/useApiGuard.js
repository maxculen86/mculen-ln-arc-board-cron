import { useRef } from 'react';

function useApiGuard() {
    const isRunningRef = useRef(false);

    const guardedExecute = async (apiFunction, ...args) => {
        if (isRunningRef.current) {
            console.warn('API call ignored - already in progress');
            return null;
        }

        try {
            isRunningRef.current = true;
            return await apiFunction(...args);
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        } finally {
            isRunningRef.current = false;
        }
    };

    return { guardedExecute };
}

export default useApiGuard;
