export function isStringBase64(string: string) {
    try {
        return window.atob(string);
    } catch (err) {
        return false;
    }
}
