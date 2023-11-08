import jwtDecode from 'jwt-decode';

// import { isBroker, isHomeBuyer, isAdmin } from './utils/auth'; to use functions needed to check

export function isSignedIn(){
    const token = localStorage.getItem('token');
    return token ? true : false;
}

export function isBroker(){
    if(isSignedIn()){
        const type = getAccountType();
        return type === "broker";
    }
    return false;
}

export function isHomeBuyer(){
    if(isSignedIn()){
        const type = getAccountType();
        return type === "homebuyer";
    }
    return false;
}

export function isAdmin(){
    if(isSignedIn){
        const type = getAccountType();
        return type === "admin";
    }
    return false;
}

function getAccountType(){
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.accountType;
}