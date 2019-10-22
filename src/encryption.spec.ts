import * as encryption from "./encryption"

const SECRET_KEY = "asdfasdfasdfasdfasdfasdfasdfasdf"

test("encrypt()", async () => {
	expect(encryption.decrypt(encryption.encrypt("hey", SECRET_KEY), SECRET_KEY)).toBe("hey")
	expect(encryption.encrypt("hey", SECRET_KEY)).toBeTruthy()
	expect(encryption.encrypt(100, SECRET_KEY)).toBeTruthy()
	expect(encryption.encrypt({ hello: "hey" }, SECRET_KEY)).toBeTruthy()
	expect(encryption.encrypt(true, SECRET_KEY)).toBeTruthy()
	expect(encryption.encrypt("hey", "hello")).toBeTruthy()
	expect(() => encryption.encrypt("hey", "")).toThrow(Error)
	expect(() => encryption.encrypt("hey")).toThrow(Error)
})

test("decrypt()", async () => {
	const encryptedStr =
		"ae8f31$9aef670513191e77b51d3948bc0ea539$33a8b27803725fd7e8c5641548b43b545a876767219e9badc280be8e3aff8bba"
	const encryptedObj =
		"55bc46634486927655e1c9e7a514ae$f5ba32e5cc42e78f5a07bcfe0645f668$d9a20b941a6ffdb64526055d388a1411e8227afd978dcec7f7aa110085a218b8"
	const encryptedObjTampered =
		"55bc46634486927655e1c9e7a514ae$f5ba32e5cc42e78f5a07bcfe0645f668$d9a20b941a6ffdb64526055d388a1411e8227afd978dcec7f7aa110085a218b9"

	expect(encryption.decrypt(encryptedStr, SECRET_KEY)).toBe("hey")
	expect(encryption.decrypt(encryptedObj, SECRET_KEY)).toEqual({ hello: "hey" })
	expect(() => encryption.decrypt("hi$")).toThrow(Error)
	expect(() => encryption.decrypt("hey$", "short-secret-key")).toThrow(Error)
	expect(() => encryption.decrypt(encryptedObjTampered, SECRET_KEY)).toThrow(Error)
})
