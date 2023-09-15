export const setHtml = (
  html: string,
): { dangerouslySetInnerHTML: { __html: string } } => ({
  dangerouslySetInnerHTML: { __html: html },
});
