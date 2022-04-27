export const shuffle = (list) => {
  const newList = list.sort(() => Math.random() - 0.5);
  return newList;
};
