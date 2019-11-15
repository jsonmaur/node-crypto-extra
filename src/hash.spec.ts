import * as hash from "./hash"

test("hash()", async () => {
	expect(hash.hash("testing")).toBe(
		"cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90",
	)
	expect(hash.hash("testing", { algorithm: "md5" })).toBe("ae2b1fca515949e5d54fb22b8ed95575")
	expect(hash.hash("testing", { salt: "yo-this-is-a-salt" })).toBe(
		"bd3df90288d99583d1c93f00ec00d92c97c3aff241b1beffb819dbd15f68d9f6",
	)
	expect(hash.hash({ test: "hi" })).toBe(
		"aa6d68a0aab2f834d2bc353d734907e0e0d562e1beaf99432bd665c96f5b4d7b",
	)
	expect(hash.hash("testing", { rounds: 100 })).toBe(
		"2c66de00e03581e03866d7b62a31a7d5776419f498f479a877270294c2600321",
	)
})
