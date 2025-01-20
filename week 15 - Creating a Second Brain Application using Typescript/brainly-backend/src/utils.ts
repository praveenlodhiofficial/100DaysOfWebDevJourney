// Random string generator function
export function random(len: number): string {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let ans = '';

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        ans += options[randomIndex];
    }

    return ans;
}