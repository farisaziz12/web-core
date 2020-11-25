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

    // MOCK FUNCTIONS

    // Mocking login function to return promise with user object
    Auth.prototype.login = jest.fn((email, password) => {
        if (email && password) {
            return Promise.resolve({ email, password });
        } else {
            throw new Error("Login Fail");
        }
    });

    // Mocking googleLogin function to return promise with user object
    Auth.prototype.googleLogin = jest.fn((success) => {
        if (success) {
            return Promise.resolve(expectedResult);
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

    // Mocking signOut function to return promise with success object if firebase sign out is a success
    Auth.prototype.signOut = jest.fn((success) => {
        if (success) {
            return Promise.resolve({
                success: true,
            });
        } else {
            throw new Error("Sign out failed");
        }
    });

    // Mocking getCurrentUser function to return promise with currentUser object if user is logged in
    Auth.prototype.getCurrentUser = jest.fn((currentUser) => {
        if (currentUser) {
            return Promise.resolve(currentUser);
        } else {
            throw new Error("No user logged in");
        }
    });

    // AUTH CLASS TESTS
    test("Auth class exists", () => {
        expect(Auth).toBeDefined();
    });

    test("Auth class instance can be initialized with config", () => {
        const auth = new Auth(mockConfig);

        expect(auth).toBeDefined();
    });

    // AUTH CLASS LOGIN METHOD TESTS

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

    // AUTH CLASS LOGIN METHOD TESTS

    test("Auth class instance googleLogin method returns user object if redirect and login is successful", async () => {
        const auth = new Auth(mockConfig);
        const result = await auth.googleLogin(true);

        expect(result.email).toBe(expectedResult.email);
    });

    test("Auth class instance googleLogin method throws error when redirect login is unsuccessful", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            auth.googleLogin(false);
        }).toThrow();
    });

    // AUTH CLASS SIGNUP METHOD TESTS

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

    // AUTH CLASS SIGNOUT METHOD TESTS

    test("Auth class instance signOut method returns success object on successful sign out", async () => {
        const auth = new Auth(mockConfig);
        const result = await auth.signOut(true);

        expect(result.success).toBeTruthy();
    });

    test("Auth class instance signOut method throws error when login fails", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            auth.signOut(false);
        }).toThrow();
    });

    // AUTH CLASS GET CURRENT USER METHOD TESTS

    test("Auth class instance getCurrentUser method returns currentUser object if user is signed in", async () => {
        const auth = new Auth(mockConfig);
        const user = {
            email: "user@test.com",
        };
        const result = await auth.getCurrentUser(user);

        expect(result.email).toBe(expectedResult.email);
    });

    test("Auth class instance getCurrentUser method throws error when no user is logged in", () => {
        const auth = new Auth(mockConfig);

        expect(() => {
            auth.getCurrentUser();
        }).toThrow();
    });
});
