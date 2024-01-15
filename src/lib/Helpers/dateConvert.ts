

export const getTimeDateOnly = (value: string) =>
{
    const currentDateValue = new Date(value);
    const resultDate = `${currentDateValue.toLocaleTimeString()}, ${currentDateValue.toLocaleDateString()}`

    return resultDate;
}