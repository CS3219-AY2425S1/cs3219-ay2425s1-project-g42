const { By, until } = require("selenium-webdriver");
let { findTextInputWithLabel, findButtonContainingText, waitForUrl, click } = require("./driver");
let { URLS } = require("./const");

// general utility methods for common tasks

const fillSignUpForm = async (driver, user) => {
  let usernameField = await findTextInputWithLabel(driver, "Username");
  let emailField = await findTextInputWithLabel(driver, "Email");
  let passwordField = await findTextInputWithLabel(driver, "Password");
  await driver.actions().sendKeys(usernameField, user.username).perform();
  await driver.actions().sendKeys(emailField, user.email).perform();
  await driver.actions().sendKeys(passwordField, user.password).perform();
  await click(await findButtonContainingText(driver, "Signup"));
};
module.exports.fillSignUpForm = fillSignUpForm;

const fillLoginForm = async (driver, user) => {
  let emailField = await findTextInputWithLabel(driver, "Email");
  let passwordField = await findTextInputWithLabel(driver, "Password");
  await driver.actions().sendKeys(emailField, user.email).perform();
  await driver.actions().sendKeys(passwordField, user.password).perform();
  await click(await findButtonContainingText(driver, "Login"));
};
module.exports.fillLoginForm = fillLoginForm;

const signUp = async (driver, user) => {
  await driver.get(URLS.signup);
  await fillSignUpForm(driver, user);
  await waitForUrl(driver, URLS.login);
};
module.exports.signUp = signUp;

const logIn = async (driver, user) => {
  await driver.get(URLS.login);
  await fillLoginForm(driver, user);
  await driver.wait(until.elementLocated(By.xpath(`//button[contains(text(),'Logout')]`)), 3000);
};
module.exports.logIn = logIn;

module.exports.signUpAndLogIn = async (driver, user) => {
  await signUp(driver, user);
  await logIn(driver, user);
};

module.exports.logOut = async (driver) => {
  await driver.get(URLS.logout);
};
