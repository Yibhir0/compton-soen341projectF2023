import jwtDecode from 'jwt-decode';

// import { isBroker, isHomeBuyer, isAdmin } from './utils/auth'; to use functions needed to check

export function isSignedIn(){
    const token = localStorage.getItem('token');
    return token ? true : false;
}

export function isBroker(){
    if(isSignedIn()){
        const type = getAccountType();
        return type == "broker";
    }   
}

export function isHomeBuyer(){
    if(isSignedIn()){
        const type = getAccountType();
        return type == "homebuyer";
    }
}

export function isAdmin(){
    if(isSignedIn){
        const type = getAccountType();
        return type == "admin";
    }
}

function getAccountType(){
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken.accountType;
}