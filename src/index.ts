import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver';
import { Driver, Options }from 'selenium-webdriver/chrome';

async function openMeet(driver: WebDriver) {
  
  try {
    await driver.get('https://meet.google.com/vgm-pwko-qqm');
    
    const popupButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),10000);
    await popupButton.click();
    
    const nameInput=await driver.wait(until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),10000);
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys('Meeting bot');
    await driver.sleep(2000)
    
    //driver.findElement(By.id("c12")).sendKeys("value", "meeting bot");
    //const popupButton =  await driver.wait(until.elementLocated(By.css('button[jsname="V67aGc"]')), 100000);
    
    const buttonInput = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ask to join")]')), 10000);
    buttonInput.click();
    await driver.wait(until.elementLocated(By.id('1231231')),1000000);


    console.log("Google Meet automation successful!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await driver.quit();
  }  
}

async function getDriver(){
  const options = new Options({})
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  //options.addArguments("--disable-gpu");
  let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
  return driver;
}

function startScreenshare() {
  // TODO: implement startScreenshare function
}

async function main(){
  const driver = await getDriver();
  await openMeet(driver);
  //wait until admin lets u join
  await startScreenshare(driver);
}
main();
