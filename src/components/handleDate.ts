const handleDate = (dateTime: number) => {
    const date = new Date(dateTime);
    const year = String(date.getFullYear()).slice(2);
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
};
export default handleDate;