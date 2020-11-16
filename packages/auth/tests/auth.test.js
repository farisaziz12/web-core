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

    // Mocking signUp function to return promise with user object if passwords match
    Auth.prototype.signUp = jest.fn((email, password, passwordConfirm) => {
        if (email && password === passwordConfirm) {
            return Promise.resolve({ email, password });
        } else {
            throw new Error("Passwords do not match");
        }
    });

    test("Auth class exists", () => {
        expect(Auth).toBeDefined();
    });

    test("Auth class instance can be initialized with config", () => {
        const auth = new Auth(mockConfig);

        expect(auth).toBeDefined();
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

    test("Auth class instance signUp method returns user object with correct signUp arguments", async () => {
        const auth = new Auth(mockConfig);
        const result = await auth.signUp(
            "user@test.com",
            "userPassword",
            "userPassword"
        );

        expect(result.email).toBe(expectedResult.email);
    });

    test("Auth class instance signUp method throws error when passwords don't match", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            // passwordConfirm misspelled
            auth.signUp("user@test.com", "userPassword", "usrPassword");
        }).toThrow();
    });

    test("Auth class instance signUp method throws error when no password confirmation is given", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            // No passwordConfirm provided
            auth.signUp("user@test.com", "userPassword");
        }).toThrow();
    });
});
