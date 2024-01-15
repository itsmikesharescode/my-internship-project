

export const generateCode = (value: number) =>
{
    const listOfChar = "abcdefghijklmnopqrstuvwxynz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYNZ9876543210";

    let result = "";

    for(let i = 0; i < value; i++){
        result = result + listOfChar[Math.round(Math.random() * 73)];
    }

    return result;
}