module.exports = (length, exp) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  const expDate = new Date(Date.now() + exp * 60 * 1000);

  return {
    code,
    expDate: expDate.toISOString(),
    expMinutes: exp,
  };
};
