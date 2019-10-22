import * as random from "./random"

test("randomString()", async () => {
	expect(random.randomString()).toBeTruthy()
	expect(random.randomString()).toHaveLength(10)
	expect(random.randomString(20)).toHaveLength(20)
	expect(() => random.randomString(0)).toThrow(Error)
	expect(() => random.randomString(-5)).toThrow(Error)
})

test("randomNumber()", async () => {
	expect(random.randomNumber()).toBeGreaterThan(0)
	expect(() => random.randomNumber({ max: Number.MAX_SAFE_INTEGER + 1 })).toThrow(Error)
	expect(() => random.randomNumber({ min: -1 })).toThrow(Error)
	expect(() => random.randomNumber({ max: -1 })).toThrow(Error)

	const min = 100
	const max = 150
	for (let i = 0; i < 10000; i++) {
		const num = random.randomNumber({ min, max })
		expect(num >= min).toBe(true)
		expect(num <= max).toBe(true)
	}
})

test("randomKey()", async () => {
	expect(random.randomKey()).toHaveLength(64)
	expect(random.randomKey(10)).toHaveLength(10)
	expect(random.randomKey(152)).toHaveLength(152)
	expect(() => random.randomKey(65)).toThrow(TypeError)
	expect(() => random.randomKey(0)).toThrow(TypeError)
})
