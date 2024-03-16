export function isDefined(value: any): boolean {
    if (typeof value !== "undefined" && value != null) {
        return true;
    }
    return false;
}
