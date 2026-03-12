```jsx

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const v = e.target.value;
  setValue(v);

  if (v.trim()) {
    setIsOpen(true);
  } else {
    setIsOpen(false);
  }

  setActiveIndex(-1);
};


const onBlur = () => {
  setIsOpen(false);
};


const handleSelect = (title: string) => {
  setValue(title);
  setIsOpen(false);
  setActiveIndex(-1);
};


<li
  key={item.id}
  className={index === activeIndex ? "suggestion active" : "suggestion"}
  onMouseEnter={() => setActiveIndex(index)}
  onMouseDown={() => handleSelect(item.title)}  // важливо
>
  {item.title}
</li>

```

---

```jsx

const onKeyDown = () => {
...
  break
...

case "Enter":
      if (activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex].title);
        inputRef.current?.blur(); // синхронізуємо DOM focus
      }
      break;

case "Escape":
  setIsOpen(false);
  inputRef.current?.blur();
  break;

}

```
