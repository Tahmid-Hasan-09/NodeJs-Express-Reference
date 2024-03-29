# YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
    * Name
    * Image


# Layout and Basic Styling
 * Create Our header and footer partials
 * Add in Bootstrap


# Creating New Campgrounds
 * Setup New Campground Post Route
 * Add in body-parser
 * setup Route to show Form
 * Add Basic Unstyled Form


# Style the campgrounds page
 * Add a better header/title
 * Make campgrounds display in a grid


# Style the Navbar and Form
 * Add a navbar to all templates
 * Style the new campground form

# Add Mongoose
 * Install and Configure Mongoose
 * Setup Campground Model
 * Use Campground Model inside of Our Routes!

# Show Page
 * Review the RESTful routes we've seen so far
 * Add description to our campground model
 * Show db.collection.drop()
 * Add a show route/template

# Refactor Mongoose Code
* Create a Models Directory
* Use module.exports
* Require everything correctly!

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment Model!
* Dispaly comments on campground show page

# Comment New/Create
* Nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add Public directory
* Add custom stylesheet

# Add User Model
* Install all packages needed for auth
* Define User model

# Auth Part 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Part 3 - Login
* Add Login routes
* Add Login template

# Auth Part 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Auth Part 5 - Show/Hide Links
* Show/hide auth links correctly

# Refactor The Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add links to Edit page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1 : Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button               
* Add Update route
<!-- campgrounds/:id/comments/:comment_id/edit -->

# Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route : /campground/:id
Comment Destroy Route : /campgrounds/:id/comments/:comment_id

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* demo working version
* Install and configure connect-flash
* Add Bootstrap alerts to header




RESTFUL ROUTES
name          url                             verb             desc.
========================================================================================
INDEX       /dogs                             GET         Display a list of all dogs
NEW        /dogs/new                          GET         Display Form to make a new dog
CREATE     /dogs                              POST        Add New Dog to DB
SHOW       /dogs/:id                          GET         Shows Info About One Dog

INDEX     /campgrounds                        GET
NEW       /campgrounds/new                    GET
CREATE    /campgrounds                        POST
SHOW      /campgrounds/:id                    GET

NEW      /campgrounds/:id/comments/new        GET
CREATE   /campgrounds/:id/comments            POST 