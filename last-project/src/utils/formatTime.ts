export const formatTime = (time: string, includeDate: boolean = false) => {
    const date = new Date(time);
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    if (includeDate) {
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${formattedTime}`;
    }
    return formattedTime;
};
