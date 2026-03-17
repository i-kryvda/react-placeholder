export const MAX_TITLE_LENGTH = 100;

const FORBIDDEN_CHARS = /[@#$]/;

export const validateTitle = (title: string): string => {
  if (title.length > MAX_TITLE_LENGTH)
    return `Max ${MAX_TITLE_LENGTH} characters`;
  if (FORBIDDEN_CHARS.test(title)) return "Forbidden chars: [@ # $]";
  return "";
};
