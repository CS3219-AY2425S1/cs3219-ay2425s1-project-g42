let { getWebDriver, findButtonContainingText, waitForUrl } = require("./utils/driver");
let { URLS, TEST_USER_1 } = require("./utils/const");
const { By, until } = require("selenium-webdriver");
const { deleteAllUsers } = require("./utils/api");
const { fillLoginForm, fillSignUpForm, signUpAndLogIn, logOut } = require("./utils/utils");

/**
 * SIGN UP LOG IN TEST
 * This test simulates a user:
 * - opening the homepage
 * - clicking log in button in toolbar
 * - clicking sign up link on login page
 * - signing up
 * - logging in
 * - logging out
 */
describe("Sign Up/Log In test", () => {
  let driver;

  beforeAll(async () => {
    driver = await getWebDriver();
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  beforeEach(async () => {
    await deleteAllUsers();
  });

  test("simulate successful user sign up and log in from home page", async () => {
    // go to home page
    await driver.get(URLS.root);

    // click log in
    let loginButton = await findButtonContainingText(driver, "Login");
    await loginButton.click();
    await waitForUrl(driver, URLS.login);

    // click sign up
    let signupLink = await driver.findElement(By.linkText("here"));
    await signupLink.click();
    await waitForUrl(driver, URLS.signup);

    // fill sign up form
    await fillSignUpForm(driver, TEST_USER_1);

    // check redirect to login
    await waitForUrl(driver, URLS.login);

    // fill log in form
    await fillLoginForm(driver, TEST_USER_1);

    // check redirect to root
    await driver.wait(until.elementLocated(By.xpath(`//button[contains(text(),'Logout')]`)), 3000);

    // log out
    let logOutButton = await findButtonContainingText(driver, "Logout");
    await logOutButton.click();

    // check redirect to login page
    await waitForUrl(driver, URLS.login);
  });

  describe("tests with existing user", () => {
    beforeEach(async () => {
      await deleteAllUsers();
      // create existing user
      await signUpAndLogIn(driver, TEST_USER_1);
      await logOut(driver, TEST_USER_1);
    });

    test("simulate unsuccessful user sign up", async () => {
      const errorMsgXpath = `//div[contains(text(),'Duplicate username or email encountered!')]`;
      await driver.get(URLS.signup);
      await fillSignUpForm(driver, TEST_USER_1);
      await driver.wait(until.elementLocated(By.xpath(errorMsgXpath)), 3000);
    });

    test("simulate unsuccessful user log in", async () => {
      const errorMsgXpath = `//div[contains(text(),'Incorrect email or password!')]`;
      
      let wrongEmail = { ...TEST_USER_1 };
      wrongEmail.email = "a" + wrongEmail.email;
      let wrongPassword = { ...TEST_USER_1 };
      wrongPassword.password = "a" + wrongPassword.password;

      await driver.get(URLS.login);
      await fillLoginForm(driver, wrongEmail);
      await driver.wait(until.elementLocated(By.xpath(errorMsgXpath)), 3000);

      await driver.get(URLS.root);
      await driver.get(URLS.login);
      await fillLoginForm(driver, wrongPassword);
      await driver.wait(until.elementLocated(By.xpath(errorMsgXpath)), 3000);
    });
  });
});
