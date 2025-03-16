# Major Project

## Project Overview
This is a full-stack web application built by **PrashantCoder**. The project utilizes cloud storage and mapping services, requiring specific API keys to run successfully.

## Installation and Setup
### Prerequisites
Ensure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- npm or yarn
- MongoDB (if applicable)

### Steps to Run the Project
1. **Clone the repository**
   ```sh
   git clone <repository_url>
   cd majorproject
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory** and add the following environment variables:
   ```env
   CLOUD_NAME=dtesyxwxc
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_api_token
   ```

4. **Run the application**
   ```sh
   nodemon app.js
   ```
   or
   ```sh
   node app.js
   ```

5. Open your browser and go to:
   ```
   http://localhost:8080/listings
   ```

## Project Dependencies
This project uses the following npm packages:
- `express` - Web framework for Node.js
- `mongoose` - MongoDB ODM
- `dotenv` - Loads environment variables
- `cloudinary` - Cloud storage for images
- `@mapbox/mapbox-sdk` - Mapbox API SDK
- `passport` - Authentication middleware

## Contributing
Feel free to contribute by submitting a pull request. Ensure you follow the project's coding style and best practices.

## License
This project is licensed under the MIT License.

---
**Created by PrashantCoder**

