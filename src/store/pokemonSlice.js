import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPokemonList, getPokemonByType } from '../api/pokemon'

const ITEMS_PER_PAGE = 20

// Thunk: fetch paginated Pokémon list
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchList',
  async (offset, { rejectWithValue }) => {
    try {
      return await getPokemonList(ITEMS_PER_PAGE, offset)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Thunk: fetch Pokémon by type
export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchByType',
  async (type, { rejectWithValue }) => {
    try {
      return await getPokemonByType(type)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],           // paginated list
    offset: 0,
    hasMore: true,
    loading: false,
    error: null,

    selectedType: null, // type filter
    typeList: [],       // filtered by type
    typeLoading: false,
  },
  reducers: {
    setSelectedType(state, action) {
      state.selectedType = action.payload
      if (!action.payload) {
        state.typeList = []
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPokemonList
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false
        const { pokemon, hasMore } = action.payload
        // action.meta.arg = offset passed to the thunk
        if (action.meta.arg === 0) {
          state.list = pokemon
        } else {
          state.list = [...state.list, ...pokemon]
        }
        state.offset = action.meta.arg + ITEMS_PER_PAGE
        state.hasMore = hasMore
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // fetchPokemonByType
      .addCase(fetchPokemonByType.pending, (state) => {
        state.typeLoading = true
        state.typeList = []
        state.error = null
      })
      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.typeLoading = false
        state.typeList = action.payload
      })
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.typeLoading = false
        state.error = action.payload
      })
  },
})

export const { setSelectedType } = pokemonSlice.actions
export default pokemonSlice.reducer
