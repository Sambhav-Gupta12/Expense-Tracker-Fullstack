//THIS FILE IS TO ADD THE AMOUNTS IN THE CHARTS IF THE SPENDING CATEGORY IS SAME.

const groupExpensesByCategory = (expenses) => {
    const groupedExpenses = {}; // Ek object banate hain jisme keys category hongi aur values total amount hongi

    expenses.forEach((item) => {
        if(groupedExpenses[item.category]){
            groupedExpenses[item.category] += Number(item.amount); // Agar category pe pehle se amount hai toh usme current amount add kar do
        }else {
            groupedExpenses[item.category] = Number(item.amount); // Nahi toh naya entry banao us category ke liye
        }
    })
    return Object.entries(groupedExpenses).map(([category, amount]) => ({
    category,
    amount
}));
}

export default groupExpensesByCategory;