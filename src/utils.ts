/**
 * Turns a value into a string. Uses JSON.stringify
 * if the value is an object.
 */
export function stringify(value: any): string {
	return typeof value === "object" ? JSON.stringify(value) : String(value)
}
