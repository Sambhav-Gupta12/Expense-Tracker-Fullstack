import formatDate from "./formatDate";

const groupExpensesByDate = (expenses) => {
  const groupedExpenses = {};

  expenses.forEach((item) => {
    groupedExpenses[item.date] =
      (groupedExpenses[item.date] || 0) + Number(item.amount);
  });

  return Object.entries(groupedExpenses)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .map(([date, amount]) => ({
      date: formatDate(date),
      amount,
    }));
};

export default groupExpensesByDate;