export const truncate = (text: string, max = 250) => {
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
};
