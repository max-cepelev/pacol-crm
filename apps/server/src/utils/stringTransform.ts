export const stringToInt = (string?: string) => {
  if (string) {
    return parseInt(string);
  }
  return undefined;
};
