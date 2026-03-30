import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchPokemonList, fetchPokemonByType, setSelectedType } from './store/pokemonSlice'
import { fetchTeam } from './store/teamSlice'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import PokemonDetail from './pages/PokemonDetail'
import AboutPage from './pages/AboutPage'
import MyTeamPage from './pages/MyTeamPage'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const {
    list, offset, hasMore, loading,
    selectedType, typeList, typeLoading,
    error,
  } = useSelector((state) => state.pokemon)

  // Fetch initial Pokémon list on mount
  useEffect(() => {
    dispatch(fetchPokemonList(0))
    dispatch(fetchTeam())
  }, [dispatch])

  // Fetch by type when selectedType changes
  useEffect(() => {
    if (selectedType) {
      dispatch(fetchPokemonByType(selectedType))
    }
  }, [selectedType, dispatch])

  const displayPokemon = selectedType ? typeList : list
  const isLoading = selectedType ? typeLoading : loading

  function handleLoadMore() {
    dispatch(fetchPokemonList(offset))
  }

  function handleRetry() {
    dispatch(fetchPokemonList(offset))
  }

  function handleSelectType(type) {
    dispatch(setSelectedType(type))
  }

  return (
    <div className="app">
      <Header title="Pokédex" />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              pokemon={displayPokemon}
              loading={isLoading}
              error={error}
              hasMore={hasMore}
              selectedType={selectedType}
              onSelectType={handleSelectType}
              onLoadMore={handleLoadMore}
              onRetry={handleRetry}
            />
          }
        />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/my-team" element={<MyTeamPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
