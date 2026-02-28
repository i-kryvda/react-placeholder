# PRODUCTION-GRADE MODAL SYSTEM

### Perfect modal

- ✓ Portal (document.body)
- ✓ Stack LIFO — кожен Escape/close прибирає верхню
- ✓ Stable ID — crypto.randomUUID()
- ✓ Escape — (без) контроль (closeOnEscape option) = useKeyEscape
- ✓ Scroll lock без layout shift (scrollbar compensation) = useLockBodyScroll
- ✓ Overlay click — контроль (closeOnOverlayClick)
- ✔ ARIA (role=dialog, aria-modal, aria-labelledby or aria-label)
- ✔ Focus trap (Tab / Shift+Tab cycle + повернення фокусу) = useFocusTrap
- ❌ Loading state (spinner, aria-live)
- ❌ Animation lifecycle (entering/entered/exiting/exited)
- ❌ Proper cleanup (timeouts, listeners, focus restore)

---

### Description

- Є вкладенні модальні вікна ? - Stack Modals Array[] ✔
- Немає вкладенних модальних вікон ? - Global Modals ✔

### Update

- Go to useReducer ?
