export default (number) => {
  const { one, two, three } = {
    one: 1,
    two: 2,
    three: 3,
  };
  const lengNum = (number.toString()).length;
  if (lengNum === one) return `000${number}`;
  if (lengNum === two) return `00${number}`;
  if (lengNum === three) return `0${number}`;
  return number;
};
