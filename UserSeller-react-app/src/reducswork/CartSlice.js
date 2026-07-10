import {createSlice} from '@reduxjs/toolkit'

const calculateCartTotals = (state)=> {
    state.totalQuantity = state.cartItem.reduce(
        (total, item)=> total + item.quantity, 0
    )
    state.totalAmount = state.cartItem.reduce(
        (total, item)=> total + Number(item.productPrice || 0) * item.quantity,0,
    )
}

const initialState = {
    cartItem: [],
    totalQuantity: 0,
    totalAmount:0,
}
    
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem: (state, action)=>{
            const newItem = action.payload
            const existingItem = state.cartItem.find(
                (item)=> item._id === newItem._id,
            )

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.cartItem.push({
                    ...newItem,
                    quantity:newItem.quantity && newItem.quantity > 0 ? newItem.quantity: 1,
                })
            }
            calculateCartTotals(state)
        },

        removeItem: (state, action)=>{
            state. cartItem = state.cartItem.filter(
                (item)=> item._id !== action.payload,
            )
            calculateCartTotals(state)
        },
           
        incrementQty:(state, action) =>{
            const itemToUpdate = state.cartItem.find(
                (item) => item._id === action.payload
            )
        

         if(itemToUpdate) {
                itemToUpdate.quantity += 1
                calculateCartTotals(state)
            }
        },


        decrementQty: (state, action)=> {
            const itemToUpdate = state.cartItem.find(
                (item) => item._id === action.payload,
            )

            if (!itemToUpdate){
                return
            }

            if (itemToUpdate.quantity > 1){
                itemToUpdate.quantity -= 1
            } else {
                state.cartItem = state.cartItem.filter(
                    (item)=> item._id !== action.payload,
                )
            }
            calculateCartTotals(state)
        },
        calculateTotalAmount: (state)=>{
            calculateCartTotals(state)
        },  
    },
})

export const {
    addItem,
    removeItem,
    incrementQty,
    decrementQty,
    calculateTotalAmount,
} = cartSlice.actions


// export const removeItem = removeItem
// export const incrementQty = incrementQty

export default cartSlice.reducer