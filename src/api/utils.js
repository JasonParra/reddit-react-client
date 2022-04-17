export const buildHeaders = (isProtected = false) => {
    if (isProtected)
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${getToken()?.access_token}`
        };
    else return {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}

export const setToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
}

export const isLooged = () => getToken()?.access_token;