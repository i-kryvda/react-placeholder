```jsx
function useCombobox({ items, onSelect }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef(null);
  const listRef = useRef(null);


useClickOutside(rootRef, () => dispatch({ type: "CLOSE" }))

const debouncedQuery = useDebounce(state.query, 200)

useEffect(() => {
  if (!debouncedQuery) return
  fetch(`/api/search?q=${debouncedQuery}`)
    .then(res => res.json())
    .then(data => setSuggestions(data))
}, [debouncedQuery])

  const handleKeyDown = (e) => {...}

  function getInputProps() {
    return {
      ref: inputRef,
      value: state.query,
      onChange: (e) =>
        dispatch({ type: "INPUT_CHANGE", payload: e.target.value }),
      onKeyDown: handleKeyDown,
      "aria-controls": listRef.current?.id,
      "aria-activedescendant": state.highlightedId,
    };
  }

  function getItemProps({ item, index }) {
    return {
      id: `item-${index}`,
      role: "option",
      "aria-selected": state.highlightedIndex === index,
      onMouseEnter: () => dispatch({ type: "HOVER_ITEM", payload: index }),
      onClick: () => dispatch({ type: "SELECT_ITEM", payload: item }),
    };
  }

  return { getInputProps, getItemProps, state, rootRef  };
}
```

- UI init

```jsx
<div ref={rootRef}>
  <input {...getInputProps()} />
  {state.isOpen && (
    <ul>
      {items.map((item, index) => (
        <li {...getItemProps({ item, index })}>{item}</li>
      ))}
    </ul>
  )}
</div>
```
