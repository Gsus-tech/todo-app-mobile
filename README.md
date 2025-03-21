# To-Do App Mobile with React Native

This is a React Native project set up with Expo. it shares the same backend as the web version, providing a seamless experience across platforms. Look at my 'todo-app-backend' repository to set up the backend sucessfully.

## Prerequisites

- **Node.js** (Recommended version: 14.x or later)
- **npm** or **Yarn**
- **Expo CLI** (You can install it globally if you don't have it yet)

To install Expo CLI globally:
```bash
npm install -g expo-cli
```
# Getting Started

## 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
```
### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash 
cd your-repository-name 
npm install
```

### 3. Set Up `.env` File

Create a `.env` file in the root directory of your project. This file will store sensitive or environment-specific variables, such as API keys or app-specific configurations.

Example `.env` file:

```env API_URL=https://your-api-url.com```

Make sure to replace `API_URL` with the actual configuration values you need.

**Note**: You can use `react-native-dotenv` or Expo's built-in support for `.env` files if you're using environment variables directly in the app.
