import crypto from "crypto"
import { stringify } from "./utils"

type HashOptions = {
	algorithm?: string
	rounds?: number
	salt?: string
}

/**
 * Gets the hash a value.
 */
export function hash(value: any, options: HashOptions = {}): string {
	const parsedValue = stringify(value)
	const algorithm = options.algorithm || "sha256"
	const rounds = options.rounds || 1

	let hash = `${parsedValue}${options.salt || ""}`
	for (let i = 0; i < rounds; i++) {
		hash = crypto
			.createHash(algorithm)
			.update(hash)
			.digest("hex")
	}

	return hash
}
