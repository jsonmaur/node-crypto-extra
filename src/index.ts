import crypto from "crypto"
import * as hash from "./hash"
import * as encryption from "./encryption"
import * as random from "./random"

function deprecationNotice(msg: string) {
	console.log(`crypto-extra: ${msg}`)
}

export = Object.assign(crypto, {
	hash: hash.hash,
	encrypt: encryption.encrypt,
	decrypt: encryption.decrypt,
	randomString: random.randomString,
	randomNumber: random.randomNumber,
	randomKey: random.randomKey,

	/* deprecated methods */
	generateKey: (...args: any) => {
		deprecationNotice("`generateKey` has been renamed to `randomKey`")
		return random.randomKey(...args)
	},
})
