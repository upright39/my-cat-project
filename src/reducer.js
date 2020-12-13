const reducer = (state, action) => {
  if (action.type === 'CLEAR_CAT') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE') {
    let del = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: del }
  }
  if (action.type === 'INCREASE') {
    let incrCart = state.cart.map((items) => {
      if (items.id === action.payload) {
        return { ...items, amount: items.amount + 1 }
      }
      return items
    })

    return { ...state, cart: incrCart }
  }
  if (action.type === 'DECREASE') {
    let decrItem = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((item) => item.amount !== 0)

    return { ...state, cart: decrItem }
  }
  if (action.type === 'GET_TOTAL') {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem
        const itemsTotal = amount * price
        cartTotal.total += itemsTotal
        cartTotal.amount += amount
        return cartTotal
      },
      {
        amount: 0,
        total: 0,
      },
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, amount, total }
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'FETCH_DATA') {
    return { ...state, cart: action.payload, loading: false }
  }

  return state
}
export default reducer
