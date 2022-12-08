# CourseProject

## Overview
Our project is a chrome extension that allows users to search their bookmarked webpages with BM25.
After installing our application, users can click on it and load their bookmarks into a personalized search engine. After the bookmarks are loaded, they can query all the webpages with any query they would like, and the top 10 results will be returned.

## Implementation Details

`Popup.html` contains the UI, and `manifest.json` contains neccessary information for Google Chrome. The main part of the code is in `bm25.js` and `popup.js`.
- `bm25.js` defines a class that handles querying a collection of documents with the BM25 algorithm.
- `popup.js` handles connecting the functionality of BM25 to the UI, while also fetching the bookmarked webpages themselves.

More in-depth documentation is written above the functions in each of the files.

## Installation Instructions
1. Clone the repository.
    ```
    git clone https://github.com/ryantwolf/CourseProject.git
    ```
1. Open Google Chrome
    1. Go to Settings > Extensions (`chrome://extensions/`)
    1. Enable developer mode in the top right
    1. Click "Load Unpacked" in the top left
    1. Select the folder of the cloned repository

## Usage
1. Click the icon for the extension in your extension bar
1. Click the "Update Bookmarks" button. This loads all the data for your bookmarks.
1. Type in a query and hit search! The top 10 results from your bookmarks will be displayed.

## Groupwork Division
- Neal and Ryan worked on implementing the UI and bookmark fetching functionality for the extension.
- Meghan and Eileen worked on implementing the BM25 algorithm in JavaScript.

### Video Demo
You can find our video demo [here](https://drive.google.com/file/d/19N98OG1Qd0McO1ENmkousQ4_1yCRCW27/view?usp=sharing).