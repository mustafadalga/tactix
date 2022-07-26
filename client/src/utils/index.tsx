export const copy = (value: string) => {
    return navigator.clipboard.writeText(value);
}
