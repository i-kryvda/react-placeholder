```jsx
Portal — не обов’язково, але для стабільного production-level autocomplete — це майже стандарт.

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
