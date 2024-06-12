# Introduction

We started our project with one partner who created the basic components. Later, the second partner joined the mission. One partner focused on the logic and CSS, while the other worked on the logic and importing videos, images, and other assets.

## Project Structure

Our project is structured around several Contexts that provide a Provider to control the web application, all managed using `useState`. Here's an overview of each Context:

### DarkModeContext

- **Purpose**: Controls whether the CSS is in light mode or dark mode.
- **Implementation**: We manage the CSS using color variables, allowing us to switch styles and colors for dark mode seamlessly.

### UsersContext

- **Purpose**: Manages user states for the current session.
- **Implementation**: 
  - During registration, it checks for existing usernames.
  - On the login page, it verifies the username and password.
  - It saves the logged-in user to provide different features based on login status.

### SearchContext

- **Purpose**: Manages the state of the search bar for videos.
- **Implementation**: Allows the search bar to retain its state across different pages, making it accessible anywhere in the app.

### VideosContext

- **Purpose**: Manages all videos in the project.
- **Implementation**: 
  - Includes JSON videos that users can control by deleting or editing within the session state.
  - Provides a function to add videos.

### LikesContext

- **Purpose**: Manages the likes system for each video.
- **Implementation**: Tracks and saves likes for each video and checks if a user has liked a video.

### CommentsContext

- **Purpose**: Manages comments for each video.
- **Implementation**: 
  - Uses an array of arrays to handle comments for each video.
  - Tracks who wrote each comment.
  - Allows users to add, delete, or edit comments based on permissions.

## Project Organization

We organized the project into various directories, each containing CSS and JS files. We created specific CSS files for each page, with some shared CSS files, and we ensured the design is responsive for different resolutions.

## Learning Experience

Throughout the project, we learned the entire workflow, how `useState` works, the syntax of React, and how to write and use functions. We also studied how to integrate JavaScript and HTML within React.

## Website Functionality

- **Home Page**: Displays all videos on the website with a left navigation bar for easy access.
- **User Interaction**: 
  - Initially, users see the login and register options.
  - Registered users can log in to access additional features such as adding, liking, commenting on, and editing videos.
- **Video Page**: Allows users to view videos without additional features when not logged in.

## Conclusion

We implemented everything using React and are proud of our work. We learned a lot about web development and how to create functional and dynamic web applications. Thank you for this learning opportunity.
