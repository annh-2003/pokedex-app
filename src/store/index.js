import { configureStore } from '@reduxjs/toolkit'
import pokemonReducer from './pokemonSlice'
import teamReducer from './teamSlice'

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    team: teamReducer,
  },
})

export default store
