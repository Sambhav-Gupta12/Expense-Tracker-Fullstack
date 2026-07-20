
const formatDate = (dateString) => {

  // Split date string into day, month, year parts
  const [day, month, year] = dateString.split("-");
  //Create an obj for months
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
   const monthIdx = parseInt(month, 10)-1; // month index starts from 0 in monthNames array
   const monthName = monthNames[monthIdx]; // Get month name from monthNames array using month index

  return `${parseInt(day, 10)} ${monthName}`;
};

export default formatDate;