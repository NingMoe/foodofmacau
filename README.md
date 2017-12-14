# foodofmacau
Interactive panel on "food of Macau". Includes physical arcade buttons, digital screens and thermal printer.

TODO:
- lighting the buttons when pressed
- set a time when the screen is refreshed and goes back to the main screen
- thermal printer
- record on database all food buttons pressed
- record on database Y/N buttons

This application is using the following npm modules:
- Johny-Five
- Raspi-IO
- Electron

Raspberry Pi Pinout 
https://pinout.xyz/

Install
installation instructions are for a Raspberry Pi (2+) only.
Before starting installation, make sure your Pi is up-to-date:
sudo apt-get update
sudo apt-get upgrade

1. Node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -  
sudo apt-get install nodejs

2. Yarn
curl -o- -L https://yarnpkg.com/install.sh | bash 

3. Source code
```git clone https://github.com/gestadieu/foodofmacau.git
```cd foodofmacau
```yarn

...wait until packages are installed. 




Thermal printer
https://www.hackster.io/trandi/purely-functional-selfies-0fd67c 
https://trandi.wordpress.com/2017/11/16/thermal-printer-remotely-controlled-through-an-esp32/

Pi-utils module
https://github.com/hellogrojo/pi-utils/blob/master/documentation.md


