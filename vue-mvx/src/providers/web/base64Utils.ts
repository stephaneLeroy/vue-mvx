export function isStringBase64(string: string) {
    try {
        const decodedString = window.atob(string);
        return decodedString.includes("@");
    } catch (err) {
        return false;
    }
}