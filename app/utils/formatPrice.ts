export const price = (cost: string | number) => {
  // if (!isNaN(Number(cost)) && cost !== null && cost !== '') {
  //   return 'not a number'
  // }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const formattedNumber = formatter.format(Number(cost));

  return formattedNumber;
};
