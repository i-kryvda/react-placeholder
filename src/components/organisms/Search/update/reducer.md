```jsx

const initialState: State = {
  query: "",
  suggestions: [],
  isOpen: false,
  highlightedIndex: -1,
  selectedItem: null,
}

type Action =
  | { type: "INPUT_CHANGE"; payload: string }
  | { type: "ARROW_DOWN" }
  | { type: "ARROW_UP" }
  | { type: "SELECT_ITEM"; payload: string }
  | { type: "CLOSE" }


  const [state, dispatch] = useReducer(reducer, initialState)

```

```jsx

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT_CHANGE": {
      const query = action.payload

      if (!query) {
        return {
          ...state,
          query,
          suggestions: [],
          isOpen: false,
          highlightedIndex: -1,
        }
      }

      const filtered = items.filter((item) =>
        item.toLowerCase().startsWith(query.toLowerCase())
      )

      return {
        ...state,
        query,
        suggestions: filtered,
        isOpen: true,
        highlightedIndex: 0,
      }
    }

    case "ARROW_DOWN":
      return {
        ...state,
        highlightedIndex: Math.min(
          state.highlightedIndex + 1,
          state.suggestions.length - 1
        ),
      }

    case "ARROW_UP":
      return {
        ...state,
        highlightedIndex: Math.max(state.highlightedIndex - 1, 0),
      }

    case "SELECT_ITEM":
      return {
        ...state,
        query: action.payload,
        selectedItem: action.payload,
        isOpen: false,
        highlightedIndex: -1,
      }

    case "CLOSE":
      return {
        ...state,
        isOpen: false,
        highlightedIndex: -1,
      }

    default:
      return state
  }
}

```

```jsx

<input
  value={state.query}
  onChange={(e) =>
    dispatch({ type: "INPUT_CHANGE", payload: e.target.value })
  }
  onKeyDown={(e) => {
    if (e.key === "ArrowDown") dispatch({ type: "ARROW_DOWN" })
    if (e.key === "ArrowUp") dispatch({ type: "ARROW_UP" })

    if (e.key === "Enter") {
      const item = state.suggestions[state.highlightedIndex]
      if (item) dispatch({ type: "SELECT_ITEM", payload: item })
    }

    if (e.key === "Escape") dispatch({ type: "CLOSE" })
  }}
/>


<ul>
  {state.isOpen &&
    state.suggestions.map((item, index) => (
      <li
        key={item}
        className={index === state.highlightedIndex ? "active" : ""}
        onMouseEnter={() =>
          dispatch({ type: "ARROW_DOWN" }) // або окремий action
        }
        onClick={() =>
          dispatch({ type: "SELECT_ITEM", payload: item })
        }
      >
        {item}
      </li>
    ))}
</ul>

```
