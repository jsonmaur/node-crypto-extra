import * as utils from "./utils"

test("stringify()", async () => {
	expect(utils.stringify(1)).toBe("1")
	expect(utils.stringify({ hey: "hi" })).toBe('{"hey":"hi"}')
})
