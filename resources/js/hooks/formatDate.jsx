export function formatDate(date) {
    const splitedDate = date.split("/");
    const year = splitedDate[2];
    const day = splitedDate[1].padStart(2, "0");
    const month = splitedDate[0].padStart(2, "0");
    return `${year}-${month}-${day}`;
}