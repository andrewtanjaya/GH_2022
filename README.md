How to run GOTONG ROYONG
1. Clone this repo
2. Open terminal in repo directory
3. Run `npm install`
4. After that run `npm start`

GOTONG ROYONG features :
- Google Sign in
- PWA (Progressive web apps)
- Send new event notification to user in 500m radius
- Only user inside radius can interact with event or other user

How to try our app features
1. Open Google Chrome [MUST USE CHROME, SINCE FCM NOT SUPPORTED IN MOST OF OTHER BROWSER]
2. F12 open dev tools > more tools > sensors (to mock location by longitude and latitude)
3. Choose Location Other... and set Latitude and Longitude

![image](https://user-images.githubusercontent.com/54787376/187055894-8c1705db-1766-42b0-b9c2-1caaebaa968c.png)
![image](https://user-images.githubusercontent.com/54787376/187055908-07784573-81d2-4ee6-bf1a-d2835bdb12a8.png)

For User 1

lat : -6.173621

long :106.786044

For User 2

lat : -6.173822814668621

long : 106.78345092103454

4. Open our app and login with google account [make sure notification are enabled for this site, to enable notification: https://support.freshchat.com/en/support/solutions/articles/50000001049-how-to-enable-push-notifications-in-your-browser-chrome-safari-firefox-edge]
5. User 1 and 2 should be able to see each other in map, because they are in 500m radius so they can interact with each other

![image](https://user-images.githubusercontent.com/54787376/187055913-4ee70d75-2382-4b28-8b5e-aef3ab25c088.png)

If User 1 create new SOS event, User 2 should be able to see the event and receive notification (notification sometimes delayed, make sure to enable all notification permission before proceed to this step) and vice versa

When user 1 or 2 can see event, they can interact with the event by accepting the event or dismis the event

User outside radius wont be able to see this

![image](https://user-images.githubusercontent.com/54787376/187055926-d370115b-c5ff-4537-bc4b-079ff9467e4e.png)

6. To create new event, press red button in the bottom middle of the screen and choose what event you wanted to emit,  or you can make your custom one  [Take notes that every user only able to make 1 event, so before making another event your need to dismiss last event]

![image](https://user-images.githubusercontent.com/54787376/187055933-562608ea-e60a-4e1e-9b0c-35e271bd9972.png)

7. When new event emitted, all users within radius will be notified

![image](https://user-images.githubusercontent.com/54787376/187055953-cf3739a1-4d38-4f08-bde5-be95edbc884e.png)

8. All user within radius can interact with that event

![image](https://user-images.githubusercontent.com/54787376/187055961-305e214b-01d5-4a07-bab0-cd70970634bc.png)

9. If user accepted the event, then the user's data will be recorded to the event

![image](https://user-images.githubusercontent.com/54787376/187055964-1058a675-ac49-4bc3-86bb-3932183e8f5c.png)

10. User also can use "view location" features to get the direction to the event location

![image](https://user-images.githubusercontent.com/54787376/187055968-c55bd933-4c9c-4ff3-b3ec-e603db8c8a52.png)

11. For owner of the event, you can dismiss the event by pressing dismiss button

![image](https://user-images.githubusercontent.com/54787376/187055973-168e053f-02b2-4b65-8e60-f172c16a229a.png)

12. Last but not least, if user dont want to receive any notification in background, user can signout from our application by pressing X button in upper right corner of  the screen

That's it , if you have any questions regarding this app, feel free to contact us
Thankyou..
