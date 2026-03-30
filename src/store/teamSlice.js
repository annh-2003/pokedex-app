import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFavorites, addFavorite, updateFavorite, deleteFavorite } from '../api/favorites'

// Thunk: load team from json-server
export const fetchTeam = createAsyncThunk(
  'team/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getFavorites()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Thunk: add Pokémon to team
export const addToTeam = createAsyncThunk(
  'team/add',
  async (member, { rejectWithValue }) => {
    try {
      return await addFavorite(member)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Thunk: update nickname
export const updateTeamMember = createAsyncThunk(
  'team/update',
  async ({ id, member, newNickname }, { rejectWithValue }) => {
    try {
      return await updateFavorite(id, { ...member, nickname: newNickname })
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Thunk: remove from team
export const removeFromTeam = createAsyncThunk(
  'team/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFavorite(id)
      return id
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTeam
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false
        state.members = action.payload
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // addToTeam
      .addCase(addToTeam.fulfilled, (state, action) => {
        state.members.push(action.payload)
      })

      // updateTeamMember
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        const index = state.members.findIndex((m) => m.id === action.payload.id)
        if (index !== -1) state.members[index] = action.payload
      })

      // removeFromTeam
      .addCase(removeFromTeam.fulfilled, (state, action) => {
        state.members = state.members.filter((m) => m.id !== action.payload)
      })
  },
})

export default teamSlice.reducer
