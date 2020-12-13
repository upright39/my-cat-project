import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
const url = 'https://course-api.netlify.app/api/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearCat = () => {
    dispatch({ type: 'CLEAR_CAT' })
  }
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  const myDataFetch = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const data = await response.json()
    dispatch({ type: 'FETCH_DATA', payload: data })
  }
  useEffect(() => {
    myDataFetch()
  }, [])
  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' })
  }, state.cart)
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCat,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
