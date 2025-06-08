# JavaScript Touch Events Demonstrator

## Project Overview

This project provides a hands-on demonstration of JavaScript touch events. It aims to help developers understand how to capture and handle touch interactions on web pages.
The demo visually represents touch points and showcases features like multi-touch, pinch-to-zoom, and draggable elements.

## Live Demo

[![GitHub Pages Deploy](https://img.shields.io/github/deployments/justinjdaniel/learn-TouchEvents/github-pages?label=GitHub%20Pages&logo=github)](https://justinjdaniel.github.io/learn-TouchEvents)

This project is automatically deployed to GitHub Pages. You can access the live demo at:
[Live Demo](https://justinjdaniel.github.io/learn-TouchEvents)

(Note: You might need to enable GitHub Pages in your repository settings and ensure the deployment URL is correct.)

## Features Demonstrated

This demo illustrates several touch event capabilities:

1.  **Basic Touch Event Handling (`touchstart`, `touchmove`, `touchend`, `touchcancel`):**

    - **Interaction:** Simply touch anywhere on the screen (that isn't one of the specific feature elements below).
    - **Behavior:**
      - `touchstart`: Creates a visual marker (a colored dot) at each touch point.
      - `touchmove`: Updates the position of the visual marker to follow your finger.
      - `touchend`: Removes the visual marker when you lift your finger.
      - `touchcancel`: Removes the visual marker if the touch is interrupted (e.g., by a browser gesture).

2.  **Multi-touch Visualization:**

    - **Interaction:** Touch the screen with multiple fingers simultaneously in the general area.
    - **Behavior:** Each distinct touch point will be represented by a uniquely colored dot, allowing you to see how multiple touches are tracked independently.

3.  **Pinch-to-Zoom Example:**

    - **Interaction:** Locate the text block labeled "Pinch to Zoom Me!". Use two fingers on this text.
    - **Behavior:** Move your fingers closer together or further apart. The font size of the text will decrease or increase accordingly, demonstrating a common pinch gesture.

4.  **Draggable Element:**
    - **Interaction:** Find the light blue square labeled "Drag Me!". Touch and drag this square around the screen.
    - **Behavior:** The square will follow your finger. Importantly, page scrolling is prevented while you are dragging this specific element, showcasing the use of `event.preventDefault()`. The element is also constrained to stay within the viewport.

## Getting Started

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/Justinjdaniel/learn-TouchEvents.git
    cd learn-TouchEvents
    ```
2.  **Open the demo in your browser:**
    Navigate to the `public/` directory and open the `index.html` file in a web browser that supports touch events (most modern browsers do). For desktop development, browser developer tools often provide touch emulation.

    > [!Tip]
    > If you have Python installed, you can run `python -m http.server` from the project root and then navigate to `http://localhost:8000/public/` in your browser. Node.js users can use `npx live-server` from the root.

## Development & Code Quality

This project uses ESLint for JavaScript linting and Prettier for code formatting to maintain code quality and consistency.

### Prerequisites for Development

- [Node.js and npm](https://nodejs.org/) (for running linters/formatters)

### Useful Scripts

- **Install dependencies (after cloning and for development):**
  ```bash
  npm install
  ```
- **Check for linting errors:**
  ```bash
  npm run lint
  ```
- **Fix linting errors automatically:**
  ```bash
  npm run lint:fix
  ```
- **Format code:**
  ```bash
  npm run format
  ```
