# Design rationale

This project is made by students of the minor webdevelopment in co-operation with the minor data driven development.

This product is divided in multiple layers, an App for the user of public car chargers, a dashboard for to provide stakeholders with relevant information and a server that provides the app and dashboard with the right information and provides feedback to user actions.

## Introduction

We are working together on creating an for a user of who drives an electric car as well for all the stakeholders involved at a charging station. There are many stakeholders involved with one single charging station. We are building a proof of concept to help make it more easy to handle all the issues. As well for the electric drivers to share their complaints about the charging stations.

### Case

When the year 2030 comes around Amsterdam wants to deny all diesel cars and prevent them from accessing the city. So that motivates people in buying electric cars but there comes a problem with that. There are not currently enough charging stations to handle in the future all the people. So they have to invest in them so that everybody can park their car.

But the ‘problem’ with a charging station that there are many stakeholders involved. So when electric car drivers find an issue with their charging station they maybe wanna report it and share their complaint. Since as stated above there are many stakeholders involved so when the driver maby calls the Municipality of Amsterdam and they can’t help you. They tell you to call another company, frustrating for the user.

So how can we concept a more robust system where it is easier to handle all the complaints and direct them to the right stakeholder. But also a for the driver to make it more easy to create an issue.

[Link to the docs for the orginal case.](https://drive.google.com/file/d/1fpVQgYPpPrP5GxCdBd7kRcVHn0LEfvgG/view)

### Concept

Since there are many users and the stakeholders of the charging station involved. There needs to be an unique application for both but interacting with each of them. That is the key point of this concept that everybody knows how or what from each other.

As an electric car driver there needs to be an app with a good range of the most common issues by default. So you can quickly share it and add the necessary details of the complaint so it can process quickly and can be solved. Think about things that a diesel car is parking or a As a user you want to also see on the map where already issues are so you don’t have to find out when you try to charge your car. Also there needs to be a overview of all your issues and their corresponding status of the ticket. All have to be updated in real time for all the users so they are constantly up to date what is happening.

As for the stakeholders such as Nuon or the Municipality of Amsterdam they have a dashboard where than can easily see and track all the tickets. There needs to be a flexible system where they can see everybody’s tickets for all the stakeholder. So when a user is calling a complaint they can see that somebody is already solving the issue. There is a tracking system where you can drag cards to different spots with their current status. If somebody is already working on it they can drag it to the ‘working’ tab so the others know what is going on. Within the dashboard is also a way to see the map with all the charging stations and their issues, if somebody is charging and all the open spots. There is a page for real time statics of different insights where you can easily look into. Maby to see what charging station is having constantly issues over a timeframe.

### Stakeholders

As mentioned in the concept already there are many stakeholders involved. The client app is for the drivers of electric cars who are looking for charging stations. Also all the stakeholders that are involved at a charging station. Such as Alliander, Nuon and Municipality of Amsterdam.

---

## Design proces

Before we could even build a prototype we had to map out what features we would like to see in the client and the dashbaord app. We came with the following feautures at first:

##### Stack

We have 2 seperated web apps who are sharing the same database. They are build with Nuxt.js a extra server side render layer on top of Vue.js. The app is build in components that can be inserted everywhere when needed, makes it really easy to. They also share the same components and styling what makes it easy to maintain. With a server in between build in typescript for GraphQL. With websockets you get in real time all the data transfer.Our data flow can be seen here:

**DATAFLOW**

There are multiple pages so here are the most important ones:

### Client

**Introduction**

The page that introduces the application to the user, with a small read up how it works and what you can do. We did choose for the color green, it gives a nice relaxing feel and it gives more of a relaxing feel. With clear and good readable fonts gives a nice visual hierachy. The font needs to be a little big so when people are in the car they want to fast create a ticket and move on. Some of the components have some shadow to give the design a little more depth. The buttons are big so it is easy to press in the car. We used a default amount of space between components so everything fits nice in the flow of all the components.

The menu always sticks to the bottom of the page in our iconic green color. It highlights where you currently are to give the user a nice visual feedback. If there is a update on your created ticket there will be a small number nexto to the ticket overview page icon. It gives the amount of updates that you missed.

**Homepage**

The main page where in different categories the most common problems are. You want a user to quickly view all the possible problems and let them choose inside that. We choose an accordion because if the user quikly wanna look and see the possibilites what he or she has to choose she can quickly compare them. After you click the issue you go to a pre programmed chat screen.

**Sub page chat**

As a user you wanna feel that you get heard. So there is a chat-like interface where pre programmed the 'operator' asks the questions that are needed to create a ticket. Every time a user fills out something they get feedback on what they submitted and got a new task to do. So now it doesn't feel that tedious to fill it out. When you share your location, there is a pop-up with the map. You can press on a charging station and automaticcly select it to submit the issue. All the charging stations on the map are devided by color on what is happening at that current moment. If a charging station has already an issue you can confirm that particulair issue and move on. No need for the other steps.

All the different pre programmed issues follow this same question answer method to quickly get all the data needed for that ticket. So every conversation has unique questions with interactions.

**Map**

A fullscreen map where in real time all the changes currently happening in the city. We use the same component on multiple pages in the app. All with the same color scheme for the different states of the charging stations. If the user has it's location turned on it automaticcly moves to his location.

**Tickets overview**

A simple overview of your tickets and their date, time created and status to give the user quickly feedback what is happening with his ticket. The status pill on the top right have a different color corronsponding to their status at the moment. If in the dashboard the operator moves the ticket it updates with web sockets in real time.

### Dashboard

**Introduction**

A dashboard for the current operator of the stakeholder. It shows the data and the tickets with a clear menu on the left.

**Homepage**

A quick overview with the map with all the charging stations. It gives a quick overview of what is happening in the city. The operator can quickly turn on and off different filters depending on what he or she wants to see. Filters include things like: showing only for the current stakeholder, only with a ticket on the charging station or all the avaliable ones. So they can tailor whatever they wanna see.

**Tickets**

This page is a way for handling tickets. It shows 3 different categories what the status of a ticket can be. Since there are many stakeholders involved at a charging station they can see what stakeholder is currently handling what ticket. So if there is a question about a particulair station they can see if there is somebody working on it already. Operators can drag and drop their current tickets to the right place.

**Insights**

Because all the data exists it is easy to create interactive graphs based on that. It is a quick way to futher look inside the data. For now we created only with the charging station data but the possibilities are endless.

### Reccomondations

-

- Create your own graphs with different parameters
-

## Conclusion

---
