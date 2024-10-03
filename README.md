# YouTube Clone Application

## Project Overview

This is a YouTube Clone web application that fetches and renders videos using the YouTube Data API. It allows users to search for videos through a search bar, and the results are displayed in a paginated format. This ensures a smooth user experience by loading videos in chunks instead of all at once.

## Features

- **Video Search**: Users can search for any video using the search bar. The app uses the YouTube Data API to fetch relevant videos based on the query.
- **Pagination**: The application implements pagination, allowing users to load and view videos in smaller batches rather than all at once. This improves performance and user experience.
- **Responsive UI**: The app adjusts for various screen sizes, providing a consistent experience across devices.
- **Navigation**: Sidebar navigation options include home, explore, subscriptions, library, and more.
- **Filter Options**: Users can filter videos by different categories such as CSS, web development, Python, entertainment, and more.

## Technologies Used

- **HTML5/CSS3**: For structuring and styling the web pages.
- **JavaScript**: To add dynamic behavior and handle pagination.
- **YouTube Data API**: Used to fetch video data from YouTube.
- **Google APIs**: The YouTube API is loaded using Google's API loader.
- **Responsive Design**: Built to work well on a variety of devices and screen sizes.

## How to Run the Project

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
2. Replace the API key in app.js with your own YouTube Data API key to fetch videos: const API_KEY = 'YOUR_YOUTUBE_API_KEY'
