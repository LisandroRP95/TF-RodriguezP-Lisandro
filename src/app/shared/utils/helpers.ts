export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKMNOPQRSTUVWQYZabcdefghijklmnopqrstuvwqyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
 }