interface Part {
  text: string;
  isMatch: boolean;
}

export const getHighlightParts = (text: string, query: string): Part[] => {
  if (!query.trim()) return [{ text, isMatch: false }];

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return [{ text, isMatch: false }];

  return [
    { text: text.slice(0, index), isMatch: false },
    { text: text.slice(index, index + query.length), isMatch: true },
    { text: text.slice(index + query.length), isMatch: false },
  ];
};
