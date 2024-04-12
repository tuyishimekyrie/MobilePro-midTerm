## MobilePro - Midterm

MobilePro is a mobile application designed for quiz administration by users. Below is the suggested structure for the project:

### 1. Authentication Module
- **Login Screen**: Allow users to log in to the application.
- **Signup Screen**: Allow new users to create an account.

### 2. Dashboard Module
- **Home Screen**: Display an overview of the user's quizzes.
- **Create Quiz Screen**: Allow users to create a new quiz.
- **Quiz Details Screen**: Display details of a specific quiz.
- **Edit Quiz Screen**: Allow users to edit an existing quiz.
- **Delete Quiz Functionality**: Allow users to delete a quiz.

### 3. Quiz Module
- **Quiz Screen**: Display quizzes available for users to take.
- **Quiz Details Screen**: Display details of a specific quiz.
- **Take Quiz Screen**: Allow users to take a quiz.
- **Quiz Results Screen**: Display the results of a completed quiz.

### 4. Profile Module
- **Profile Screen**: Display user information and settings.
- **Edit Profile Screen**: Allow users to edit their profile information.

### 5. Backend Integration
- Integrate with Firebase or another backend service for authentication, data storage, and retrieval.
- Implement APIs for CRUD operations on quizzes and user data.

### 6. Navigation
- Use a navigation library (e.g., React Navigation) to handle navigation between screens.

### 7. Design and UI/UX
- Design intuitive and user-friendly interfaces for all screens.
- Ensure consistent branding and design elements throughout the app.

### 8. Testing
- Perform unit testing for individual components and modules.
- Conduct integration testing to ensure smooth interactions between different parts of the application.
- Perform end-to-end testing to simulate user flows and identify any issues.

### 9. Deployment
- Build APKs for Android devices and distribute via Google Play Store.
- Build IPAs for iOS devices and distribute via the App Store.

### 10. Maintenance and Updates
- Regularly update the app with new features, bug fixes, and performance improvements based on user feedback.
- Monitor app performance and address any issues promptly.

By following this structure and incorporating the mentioned features, MobilePro can become a comprehensive and user-friendly mobile application for quiz administration.

Discepancies in package.json
============================

"@react-native-firebase/auth": "^19.0.1",
"@react-native-firebase/database": "^19.0.1",
"@react-native-firebase/firestore": "^19.1.0",