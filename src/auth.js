import moment from 'moment';

export const isLoggedIn = () => {
    return moment().isBefore(getExpiration())
} 

export const isLoggedOut = () => {
    return !isLoggedIn()
} 

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    window.location.replace("/");
}

const getExpiration = () => {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}