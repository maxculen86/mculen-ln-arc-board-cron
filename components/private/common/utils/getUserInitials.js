const getUserInitials = (firstName = '', lastName = '', email = '') =>
    (firstName && lastName
        ? `${firstName[0]}${lastName[0]}`
        : email.substring(0, 2)
    ).toUpperCase();

export default getUserInitials;
