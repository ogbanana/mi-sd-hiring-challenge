# Hello Movable Ink Team!

For this take home I tried to write reusable functions in the utils.js file and keep the html related code in the app.js file.

## Some of the decisions I had to make are listed below:
1. Should I use the browser navigator geolocation api? -- Could be a cool feature but will need to check if the user's browser supports it.
2. Should the zipcode input be tested before submitting? -- I could quickly do that with the required prop, but an extra function could be written to check if the input is a valid zipcode before calling the fetchGeolocation API.
3. Should I be redirected to a new page with results after the user submits their zipcode? -- Could be good to implement if there will be more data to display. For now I will generate new elements on the same page.

At the very end, I wanted to see if I could implement no.1, the navigator geolocation API, and reuse the fetchGeolocationAPI and fetchForecastAPI to perform the same functionality as entering the zipcode. I was only able to get the longitude and latitude. Additional research will need to be done on my end to utilize the geolocation api methods.

Thanks for putting this together, it was a lot of fun!

Thank you for your time!
Amy 
