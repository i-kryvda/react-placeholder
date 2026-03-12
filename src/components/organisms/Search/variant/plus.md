### derived state

```jsx
Іноді навіть не тримають isOpen як state, а обчислюють його:

const isOpen =
  value.trim().length > 0 &&
  suggestions.length > 0 &&
  isFocused;

```

### PORTAL

```jsx
UX приклад
Google search, GitHub search, Slack message autocomplete — усе працює через portal.
Це дозволяє dropdown поводитись стабільно навіть у складному layout.


<div ref={inputContainerRef}>
  <input ref={inputRef} ... />
</div>

{isOpen &&
  ReactDOM.createPortal(
    <ul
      className="suggestions"
      style={{ position: "absolute", top: y, left: x, width: w }}
    >
      ...
    </ul>,
    document.body
  )
}

```
