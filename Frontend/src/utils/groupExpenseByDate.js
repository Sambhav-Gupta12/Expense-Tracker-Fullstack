import formatDate from "./formatDate";

const parseDate = (dateString) => {
  const [dd, mm, yyyy] = dateString.split("-");

  return new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd)
  );
};

const groupExpensesByDate = (expenses) => {
  const groupedExpenses = {};

  expenses.forEach((item) => {
    if (groupedExpenses[item.date]) {
      groupedExpenses[item.date] += Number(item.amount);
    } else {
      groupedExpenses[item.date] = Number(item.amount);
    }
  });

  return Object.entries(groupedExpenses)
    .sort(([dateA], [dateB]) =>
      parseDate(dateA) - parseDate(dateB)
    )
    .map(([date, amount]) => ({
      date: formatDate(date),
      amount,
    }));
};

export default groupExpensesByDate;