export default function dateCoverter(date) {
  const createDate = new Date(date);
  const formattedDate = createDate.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}
