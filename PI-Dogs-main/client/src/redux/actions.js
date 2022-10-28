import axios from "../../../api/node_modules/axios";

export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const FILTER_BY_TEMPS = 'FILTER_BY_TEMPS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const BACK_TO_HOME = 'BACK_TO_HOME';
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME';

export function getTemperaments() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/temperaments`)
        .then(r => r.json())
        .then(temps => dispatch({type: GET_TEMPERAMENTS, payload: temps}))
        .catch(e => {
            console.log(e);
            return e;
        });
    }
}

export function getDogs() {
    return function(dispatch) {
        return fetch('http://localhost:3001/dogs')
        .then(r => r.json())
        .then(dogs => dispatch({type: GET_DOGS, payload: dogs}))
        .catch(e => {
            console.log(e);
            return e;
        });
    }
}

export function getDogDetail(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/dogs/${id}`)
        .then(r => r.json())
        .then(dog => dispatch({type: GET_DOG_DETAIL, payload: dog}))
        .catch(e => {
            console.log(e);
            return e;
        });
    }
}

export function filterByCreated(payload) {
    return {type: FILTER_BY_CREATED, payload};
}

export function filterByTemps(payload) {
    return {type: FILTER_BY_TEMPS, payload};
}

export function orderByName(payload) {
    return {type: ORDER_BY_NAME, payload};
}

export function orderByWeight(payload) {
    return {type: ORDER_BY_WEIGHT, payload};
}

export function backToHome() {
    return {type: BACK_TO_HOME}
}

export function searchByName(name) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${name}`)
        .then(r => r.json())
        .then(dogs => dispatch({type: SEARCH_BY_NAME, payload: dogs}))
        .catch(e => {
            console.log(e);
            return e;
        });
    }
}

export function postDog(dog) {
    return async function () {
        let post = await axios.post('http://localhost:3001/dogs', dog);
        return post;
    }
}