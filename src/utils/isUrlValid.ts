export const isUrlValid = (url?: string): boolean => {
  return (
    !!url &&
    !!url.match(
      /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
    )
  );
};
