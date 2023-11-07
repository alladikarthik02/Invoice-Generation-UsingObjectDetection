# Invoice Generation By Object Detection Using Yolo v8

This project focuses on invoice generation using object detection powered by YOLO v8. We have developed our own machine learning model to achieve this. Follow the instructions below to install and run the project.

## Installation

There are multiple steps involved in executing our project. They can be divided into the following parts:

### Step 1: Install venv in the ML Folder

1. Navigate to the ML folder in the terminal using the `cd` command or the open integrated terminal feature in VSCode.
2. Run the following command to create a virtual environment: `python3 -m venv ./venv`.
3. Activate the virtual environment using the command: `scripts/activate`.

### Step 2: Install the Node Modules in Client and Server

1. Navigate to the client and server folder in the terminal using the `cd` command or the open integrated terminal feature in VSCode.
2. Run the following command to install Node modules: `npm i`.

### Step 3: Configuration for Windows

If you are using a Windows machine, follow these additional steps:

1. Go to `package.json` in both the client and server folders and make the following changes:
   - Change the "start" script to: `"set NODE_OPTIONS=--openssl-legacy-provider&& react-scripts start"`.
   - Change the "build" script to: `"set NODE_OPTIONS=--openssl-legacy-provider&& react-scripts build"`.

### Step 4: Running the Servers

Now you need to run the three different servers separately:

1. In the server folder, run the command: `node app`.
2. In the ML folder, run the command: `python server_main.py`.
3. In the client folder, run the command: `npm start`.

**Note**: If you are using a Windows machine, change line 193 in `ShoppingCart.js` to "http://localhost:5000/video-feed".

## Usage

Follow these instructions to successfully install and run the project. The system is now ready to detect objects in images and generate invoices based on the detected items.

## Additional Resources

- **Execution Video**: View the project execution on our [YouTube channel](https://www.youtube.com/watch?v=c4U9j9iE-f0).

Feel free to explore these resources for a deeper understanding of our project.
