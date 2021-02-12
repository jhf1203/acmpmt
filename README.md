# CR8ED

Musical Archeology | Cultural Anthropology

![](https://img.shields.io/badge/License-MIT-yellowgreen)

## Table Of Contents

1.  [Description](#description)
2.  [Installation](#installation)
3.  [Usage](#usage)
4.  [Collaborating](#collaborating)
5.  [Contact](#contact)

---

### Description

Tech Stack:  MongoDB, Express Server, React.js, Node.js

Cr8ed ("Crated," derived from the slang term "Digging through crates" to find hidden gems in a record store) is a single-page app that helps users discover & catalog new music and connects like-minded users with one another.  Whereas most streaming or web-based music services allow similar artists for one artist, cr8ed aggregates similar artists to three user selected ones, allowing more of a "little bit of this, little bit of that" drill-down into what you either want to discover or feel like hearing.

---

### Instructions

You can access cr8ed on [Heroku](https://acmpmt.herokuapp.com/#/).

---

### Usage

Please enjoy a demonstration of this app's functionality

![image](./client/src/assets/demo/cr8ed-demo.gif)

Once you register and login, there are two main pages to navigate:

##### Search Page

Here you simply enter three somewhat-related artists.  A third-party API (last.fm) is used to find which simmilar artists each of your entries shares.  The top album from the three strongest artist matches are provided, with an opportunity to view more info about each given album.  External links are available for highly detailed info, but the UI gives the basic album info as well as information on other cr8ed users who currently have this sitting in their queue (reminder to listen later) or recommendations (tagged as a favorite found album).  

From this info you can either add the album to your queue or recommendations, or you can view the profile of users who already have this album cataloged.  This allows the user the opportunity to connect with other like-minded users, as well as discover new content off of their own lists.

##### Profile Page

This is the main landing page of the site.  It features your (or someone else's should you click a link to their profile) basic account information, plus a list of your network (who you're following and who's following you), and visualizations of both albums that you've queued and recommended.  Also featured is a music cloud to provide a snapshot of the user's overall taste.  Each queued and recommended album has five pre-assigned "tags" that grow in size in the word cloud as their frequency increases in your list.

---

### Collaborating

Got an idea? A bug to report? Or even a thought on how the application could run more efficiently? Log it [here](https://github.com/jhf1203/portfolio/issues) as an issue, and we'll talk about it!

---

### Contact Me

#### Jim Faulkner

- [E-mail](mailto:jhf1203@gmail.com)
- [Github](jhf1203)

---

### License

This application is [licensed](https://opensource.org/licenses/MIT) under the MIT License