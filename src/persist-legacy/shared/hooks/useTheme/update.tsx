// import { useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@persist-legacy/app/store/store.tsx";
// //
// import { toggleTheme, setTheme, ThemeMode } from "../store/theme/theme.slice";

// export const useTheme = () => {
//   const theme = useAppSelector((state) => state.theme.mode);
//   const dispatch = useAppDispatch();

//   // Застосувати тему до document
//   useEffect(() => {
//     let actualTheme: "light" | "dark" = theme;

//     // Якщо режим "system" - визначити з системних налаштувань
//     if (theme === "system") {
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;
//       actualTheme = prefersDark ? "dark" : "light";
//     }

//     // Встановити data-атрибут (найкращий спосіб)
//     document.documentElement.setAttribute("data-theme", actualTheme);

//     // Додатково встановити клас (якщо використовуєш Tailwind)
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(actualTheme);

//     // Опціонально: додати клас на body
//     document.body.classList.remove("light", "dark");
//     document.body.classList.add(actualTheme);
//   }, [theme]);

//   // Слухати зміни системної теми (якщо режим "system")
//   useEffect(() => {
//     if (theme !== "system") return;

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//     const handleChange = (e: MediaQueryListEvent) => {
//       const actualTheme = e.matches ? "dark" : "light";
//       document.documentElement.setAttribute("data-theme", actualTheme);
//       document.documentElement.classList.remove("light", "dark");
//       document.documentElement.classList.add(actualTheme);
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [theme]);

//   // Методи для роботи з темою
//   const toggle = () => {
//     // Перемикати між light і dark (ігнорувати system)
//     const newTheme = theme === "light" ? "dark" : "light";
//     dispatch(setTheme(newTheme));
//   };

//   const set = (mode: ThemeMode) => {
//     dispatch(setTheme(mode));
//   };

//   const reset = () => {
//     dispatch(setTheme("system"));
//   };

//   // Визначити фактичну тему (з урахуванням system)
//   const getActualTheme = (): "light" | "dark" => {
//     if (theme === "system") {
//       return window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
//     }
//     return theme;
//   };

//   return {
//     theme, // Поточна тема ('light' | 'dark' | 'system')
//     actualTheme: getActualTheme(), // Фактична тема ('light' | 'dark')
//     isDark: getActualTheme() === "dark",
//     isLight: getActualTheme() === "light",
//     isSystem: theme === "system",
//     toggle, // Перемкнути між light/dark
//     setTheme: set, // Встановити конкретну тему
//     reset, // Скинути на системну
//   };
// };
