import { useContext } from 'react';
import { AuthContext } from '../AuthInitializer';

const useAuthManager = () => useContext(AuthContext) || {};

export default useAuthManager;
