# React Learning Roadmap Integrated Mini Project: Pokédex Application (PokéAPI + CRUD)

## Pokédex Mini Project Goals

Build a basic **Pokédex** application with React, allowing users to:

- View a **list of Pokémon** from [PokéAPI](https://pokeapi.co).
- View **Pokémon details** (image, type, stats, abilities, evolution).
- **Search and filter** Pokémon by name or type.
- Manage **"My Team"** (list of favorite Pokémon):
  - **Add** Pokémon from the list or detail page.
  - **Edit** Pokémon nicknames in the team.
  - **Delete** Pokémon from the team.
- Save **My Team** via a mock API (mock API CRUD, e.g., JSON Server).
- (Advanced) Manage global state with **Context or Redux**.
- (Advanced) Integrate **light/dark** theme.

---

## Detailed Implementation Content

---

## Module 1: Introduction to React & JSX

### Theory

- React is a JS library for building UIs, using Virtual DOM for optimized rendering.
- JSX allows writing HTML in JS.
- Project organization with Vite/Create React App.

### Practice

- Create a pokedex-app project with Vite.
- Render `<h1>Welcome to Pokédex!</h1>`.

**PokéAPI used:** *(not yet needed)*

---

## Module 2: Components & Props

### Theory

- Functional Components in React.
- Props to pass data from parent to child.
- Reusable Components to display multiple similar items.

### Practice

- Header (props: title).
- PokemonCard displays name, image, type.

**PokéAPI used:**

`GET /pokemon?limit=20&offset=0` → list of Pokémon.

`GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`

**Response (abbreviated):**

```json
{
  "results": [
    { "name": "bulbasaur", "url": "https://..." }
  ]
}
```

---

## Module 3: Styling

### Theory

- Styling methods: pure CSS, CSS Modules, Tailwind.
- Create reusable and maintainable styles.
- Design beautiful, responsive cards.

### Practice

- Style PokemonCard with type badge (e.g., Fire = red, Water = blue).

**PokéAPI used:**

- Get Pokémon images from `sprites.front_default` in Pokémon details.

---

## Module 4: State & useState

### Theory

- State in React stores dynamic data.
- `useState` hook to declare and update state.
- When state changes → component re-renders.

### Practice

- Use `useState` to manage the Pokémon list.

**PokéAPI used:**

`GET /pokemon/{name}` to get detailed information.

`GET https://pokeapi.co/api/v2/pokemon/pikachu`

**Response (abbreviated):**

```json
{
  "id": 25,
  "name": "pikachu",
  "sprites": { "front_default": "https://..." },
  "types": [ { "type": { "name": "electric" } } ]
}
```

---

## Module 5: useEffect & Side Effects

### Theory

- Side effects: API calls, DOM manipulation, saving to localStorage.
- `useEffect` hook to perform side effects after rendering.
- Dependency array to control when the effect runs.

### Practice

- Call API in `useEffect`.
- Manage Loading/Error state.

**PokéAPI used:**

- `GET /pokemon?limit=20&offset=0` to load the initial list.

---

## Module 6: React Router DOM

### Theory

- Router in React for SPA navigation.
- BrowserRouter, Routes, Route.
- Dynamic Route with `useParams`.
- Link for navigation without page reload.

### Practice

- `/` → list of Pokémon.
- `/pokemon/:name` → Pokémon details.
- `/about` → Introduction.
- `/my-team` → team management (CRUD).

**PokéAPI used:**

- `GET /pokemon/{name}` → details (stats, abilities, sprites).
- `GET /pokemon-species/{id}` → additional information (color, evolution chain url).

---

## Module 7: React Form & List and Key (Adding Pokémon to Team)

### Theory

- Controlled Components in forms.
- `onChange`, `onSubmit`.
- List and Key prop when rendering lists.

### Practice

- Form to enter nickname when adding Pokémon.
- Submit → add to team.

**PokéAPI used:**

- Use Pokémon data fetched from `/pokemon/{name}`.

**Mock CRUD API (JSON Server):**

- `POST /favorites`

  `POST http://localhost:3001/favorites`

```json
{
  "pokemonId": 25,
  "nickname": "..."
}
```

---

## Module 8: Complex Components (Edit/Delete)

### Theory

- Composition to reuse forms for multiple functions.
- Extract repetitive logic into Custom Hook.

### Practice

- `/edit-team/:id` → edit Pokémon nickname.
- "Delete" button → remove Pokémon from team.

**Mock CRUD API:**

- `PUT /favorites/:id`

  `PUT http://localhost:3001/favorites/1`

```json
{
  "pokemonId": 25,
  "nickname": "ThunderPika"
}
```

- `DELETE /favorites/:id`

  `DELETE http://localhost:3001/favorites/1`

---

## Module 9: Context API

### Theory

- Context API helps pass state through multiple components without prop drilling.
- `createContext`, `Provider`, `useContext`.
- When to use Context.

### Practice

- `ThemeContext` to manage light/dark mode.
- `TeamContext` to share team list (if not using Redux).

**PokéAPI used:**

- Not directly, but context can store theme or favorites.

---

## Module 10: RESTful APIs with React

### Theory

- How to call API in React using fetch/axios.
- Manage Loading/Error state.
- Pagination, Search, Filter.

### Practice

- Call PokéAPI to get Pokémon.
- Call Mock API for Team CRUD.
- Add toast notification when add/edit/delete is successful.

**PokéAPI used:**

- `GET /type/{type}` → filter Pokémon by type.
- `GET /evolution-chain/{id}` → display evolution chain.

---

## Module 11: Redux / Redux-thunk, Redux-saga

### Theory

- What is Redux? Store, Reducer, Action.
- `react-redux`: Provider, `useSelector`, `useDispatch`.
- Middleware: Redux-thunk (async logic), Redux-saga (advanced side effects).

### Practice

- Use Redux to manage Pokémon + Team state.
- Use Redux-thunk to call PokéAPI & Mock CRUD APIs.
- (Advanced) Use Redux-saga to manage complex side effects.

**PokéAPI used:**

- Manage all API calls (Pokémon list, details, type filter).

**Mock CRUD API:**

- Team CRUD via Redux actions: ADD, UPDATE, DELETE.
