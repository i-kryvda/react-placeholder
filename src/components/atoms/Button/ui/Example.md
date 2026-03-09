```jsx
import { Link } from "react-router-dom";

<Button as={Link} to="/tasks">
  Tasks
</Button>;
```

```jsx
<Button as="a" href="/about">
  About
</Button>
```

```jsx
  <Button onClick={saveTask}>Save</Button>
  <Button variant="secondary" size="lg">Delete</Button>
  <Button isLoading>Sending...</Button>
```

# Update

```jsx
// Це трохи покращить UI/UX, але мені якось не дуже
{
  isLoading ? (
    <span className={styles.loader} />
  ) : (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );
}
```
