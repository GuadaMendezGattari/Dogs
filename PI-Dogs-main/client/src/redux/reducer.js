import { 
    GET_TEMPERAMENTS, 
    GET_DOGS, 
    GET_DOG_DETAIL, 
    FILTER_BY_CREATED,
    FILTER_BY_TEMPS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    BACK_TO_HOME,
    SEARCH_BY_NAME
} from "./actions";

const initialState = {
    temperaments: [],
    copyTemperaments: [],
    dogs: [],
    copyDogs: [],
    dogDetail: {}
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
                copyTemperaments: action.payload
            }
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                copyDogs: action.payload
            }
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        case FILTER_BY_CREATED:
            return {
                ...state,
                dogs: action.payload === 'created' ? state.copyDogs.filter(el => el.createdInDb === true) : state.copyDogs.filter(el => el.createdInDb === false)
            }
        case FILTER_BY_TEMPS:
            return {
                ...state,
                dogs: state.copyDogs.filter(el => el.temperament ?
                    (!Array.isArray(el.temperament) ? el.temperament.includes(action.payload) : el.temperament.map(e => e.name).includes(action.payload)) : 
                    false)
            }
        case ORDER_BY_NAME:
            const byName = action.payload === 'asc' ?
            state.copyDogs.sort((a, b) => {
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0
            }) :
            state.copyDogs.sort((a, b) => {
                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;
                return 0;
            })
            return {
                ...state,
                dogs: [...byName]
            }
        case ORDER_BY_WEIGHT:
            const filterNaN = state.copyDogs.filter(el => isNaN(Number(el.weight.split(' ')[0])));
            const filterNotNaN = state.copyDogs.filter(el => !isNaN(Number(el.weight.split(' ')[0])));
            const byWeight = action.payload === 'asc' ? 
            filterNotNaN.sort((a, b) => a.weight.split(' ')[0] -  b.weight.split(' ')[0]).concat(filterNaN) :
            filterNaN.concat(filterNotNaN.sort((a, b) => a.weight.split(' ')[0] -  b.weight.split(' ')[0]).reverse());
            return {
                ...state,
                dogs: byWeight
            }
        case BACK_TO_HOME:
            return {
                ...state,
                dogDetail: {}
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        default:
            return {...state};
    }
}

export default rootReducer;