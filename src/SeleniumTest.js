const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver");

async function RouteTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .setChromeService(
      new chrome.ServiceBuilder(
        "C:/Users/Rushabh Karade/Downloads/chrome-win64/chrome-win64/chrome.exe"
      )
    )
    .build();

  try {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("Home")).click();

    await driver.wait(until.urlIs("http://localhost:3000/Home"), 10000);

    console.log("test pass");
  } catch (error) {
    console.error("route test failed", error);
  } finally {
    await driver.quit();
  }
}
