export function getCurrentMonthYear() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return { month, year };
}