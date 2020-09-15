export const initialState = {
    basket: [],
    user: null
};

//Selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => amount + item.price, 0);
}

export const getUserName = (user) => {
    console.log(user, 'user');
    const nameParts = user?.email.split('@');
    const name = nameParts?.length === 2 ? nameParts[0] : null;
    return name?.charAt(0).toUpperCase() + name?.slice(1);
}

const reducer = (state=initialState, action) => {

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE_FROM_BASKET':
                const index = state.basket.findIndex( basketItem => basketItem.id === action.id);
                let newBasket = [...state.basket];

                if(index >=0 ){
                    newBasket.splice(index, 1);
                }else console.warn(`Can not remove id: ${action.id} as its not in basket`);

                return {
                    ...state,
                    basket : newBasket
                };

        case 'SET_USER' :
            return {
                ...state,
                user : action.user
            }

        default: return state;
    }
}

export default reducer;