export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const validatePhoneNumber = (phoneNumber) => {
    // Regex for US phone numbers in formats like (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
    const re = /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    return re.test(String(phoneNumber));
}

export const validateUsername = (username) => {
    // Username must be alphanumeric and can include underscores, 3-16 characters long
    const re = /^[a-zA-Z0-9_]{3,16}$/;
    return re.test(String(username));
}

export const validatePassword = (password) => {
    // Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
}