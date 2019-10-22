import crypto from "./"

test("exports", async () => {
	expect(crypto.createHmac).toBeTruthy()
	expect(crypto.randomString).toBeTruthy()
})

test("deprecated", async () => {
	expect(crypto.generateKey()).toBeTruthy()
})
