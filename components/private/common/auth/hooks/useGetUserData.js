import { useState, useEffect } from 'react';
import getUserInitials from '../../utils/getUserInitials';
import getUserData from './_helper';

const useGetUserData = (productPremiumToValidate = '') => {
    const [userData, setUserData] = useState({
        userType: 'loading',
        isSubscribed: false,
        userEmail: '',
        userName: '',
        userLastName: ''
    });

    useEffect(() => {
        setUserData(getUserData(productPremiumToValidate));
    }, []);

    const {
        userType = 'loading',
        isSubscribed = false,
        userEmail = '',
        userName = '',
        userLastName = ''
    } = userData;

    return {
        userType,
        initials: getUserInitials(userName, userLastName, userEmail),
        userEmail,
        isSubscribed,
        userName,
        userLastName
    };
};

export default useGetUserData;
