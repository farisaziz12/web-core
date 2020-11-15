const { Auth } = require("../src");
jest.mock("../src");

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Auth.mockClear();
});

describe("Auth Class", () => {
    const expectedResult = {
        email: "user@test.com",
    };
    const mockConfig = {
        apiKey: "apiKey",
    };
    // Mocking login function to return promise with user object
    Auth.prototype.login = jest.fn((email, password) => {
        if (email && password) {
            return Promise.resolve({ email, password });
        } else {
            throw new Error("Login Fail");
        }
    });

    test("Auth class instance login method returns user object with correct login arguments", async () => {
        const auth = new Auth(mockConfig);
        const result = await auth.login("user@test.com", "userPassword");

        expect(result.email).toBe(expectedResult.email);
    });

    test("Auth class instance login method throws error with no/wrong arguments", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            auth.login();
        }).toThrow();
    });
});
