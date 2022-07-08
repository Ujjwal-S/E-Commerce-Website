import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'



export const cartReducer = (state={cartItems:[]}, action) => {
    switch(action.type){

        case CART_ADD_ITEM:
            // we will check if the item already exists in cart
            // if it already exists then we will replace it with new item in payload -> which will be the same product just with the updated quantity
            // if not we will add that item in cart
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)   // look in cartActions this is checking if both the _id(s) match

            if (existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => 
                        x.product === existItem.product ? item : x  // is this product same as the existItem (defined above)
                                                                    // if yes then replace that product with item (defined above)
                                                                    // if not just return 'x' which basically means do nothing   
                    )
                }
            }else{
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        item  // it will add new item (defined above) to array
                    ]
                }
            }
        
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state  // if none of the above work we just want ot return initial state
    }
}