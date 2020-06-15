# TruZillow
Real Estate App

Truzillow is a Trulia/Zillow clone that takes advantage of React Context and uses the Bridge real estate API to find and display properties in various cities throughout Texas.

## Usage
From the home/start page choose whether to login (account already created) or register (new user).

Once registered or logged in, you will be brought to the main/map page.

## Main Page
The main page consists of a Header, Map, Sidebar and a modal.

### Header
Shows the current logged in user. Clicking on the user name brings up a menu allowing you to view/update your profile, view the main/map page, or log out.

### Map
Plots all properties for a selected city (default is Austin). Hovering on a marker will expose a pop-up with an image (if available) of the property and some basic information. You also have the options of adding the property to your favorites, or viewing more information on the property.
 
### Sidebar
Allows you to choose a city in which to view properties. It also lists all properties in the selected city, as well as your saved favorites. Clicking on a favorite will open a modal with detailed information on that favorite. Hovering on a listing under the "All" category will bring up the pop-up for that property on the map, showing its location and giving basic information.

### Modal
Displays detailed information on a selected property and gives the option of sending an auto-generated email to the broker expressing your interest and supplying your email address (used to create your account) for followup.

## My Account Page
Displays current profile information and allows you to update the given fields.

## Built with
- MongoDB
- Express
- React
- NodeJS