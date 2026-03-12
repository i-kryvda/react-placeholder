# Click Outside

- Це допоможе закривати підсказку якщо ми клікаємо кудись.
- Це трохи інший підхід від focus(), тобто коли ми закряття робимо коли Input не у focus()
- Таким чином click Outside не треба використвоувати разом з inputRef.current.focus()
- Зазвичай такий підхід click Outside використовують у Redix, hadless

---

```tsx
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
```

```jsx
<div ref={containerRef}>
  <input />
  <ul>suggestions</ul>
</div>
```

### Що тут відбувається
