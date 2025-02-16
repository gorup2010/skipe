export const display = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

export const displayFull = (dateString: string) => {
  const date = new Date(dateString);
  const minute = date.getMinutes();
  return (
    date.getHours() + ":" + (minute < 10 ? "0" + minute : minute) + (date.getHours() < 12 ? "AM " : "PM ") +
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
