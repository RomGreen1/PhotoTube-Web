# Phottubee_Web

Phottubee_Web is the React-based frontend for the Phottubee social media platform, designed to seamlessly integrate with the Phottubee_Server's API endpoints. This client-side application offers users an intuitive interface to interact with the platform's key features, including video creation, commenting on videos, user profile customization, and adding users.

## Features

### Offline Features
- **HomePage**: Users can see the first 10 most viewed videos and 10 additional videos randomly selected. The videos are shown in a random order.
- **Adding User**: Click on 'Register' in the left menu, fill in your information, and register.
- **Login**: Click on 'Login' in the left menu, fill in your information, and log in.
- **VideoPage**: When you click on a video, you can see the video along with a list of other videos on the side.
- **UserPage**: When you click on a user's image under a video, you can see all of the user's videos and the most viewed video.

### Login Features
- **VideoPage**:
  1. Make, delete, and update a comment.
  2. Like or dislike the video.
  3. If you created the video, you can edit or delete it.

- **UserInfo**: Edit your profile by changing the information that is already there.

- **AddVideo**: You can add a video under your name.

## Getting Started

To fully utilize the features of Phottubee_Web, make sure that the Phottubee_Server is up and running, as this frontend application depends on its API endpoints for data.

### Prerequisites
- A working instance of Phottubee_Server
- Node.js
- npm or yarn

### Installation

Clone the repository and install the necessary dependencies:

```
bash
git clone https://github.com/DavidIzhaki/Phottubee
cd Phottubee_Web
npm install
```

The Phottubee_Server comes with the latest build of the Phottubee_Web application pre-installed, so you don't need to run the React development client to access the web interface.

If you prefer to run the Phottubee_Web separately, you can use the following command:

\```
bash
npm start
\```

### Note

Phottubee_Web is the frontend component of the Phottubee social media platform. To take advantage of all its features, such as video posting, commenting, and profile management, the backend server (Phottubee_Server) needs to be running.

For more information on setting up and running the backend, refer to the Phottubee_Server README at [https://github.com/DavidIzhaki/Phottubee](https://github.com/DavidIzhaki/Phottubee).
