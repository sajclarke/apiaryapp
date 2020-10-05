## Bee Tracking app

This repo is an example template for quickly setting up react-native-cli and [react-native-firebase](rnfirebase.io)

## Roadmap

- [x] Firebase Setup
- [x] Firestore Integration
- [ ] Maps
- [ ] Email/Password authentication

## Setup Instructions

- Clone repo to local machine
- Setup firebase project on www.firebase.com
- Enable firestore database in your firebase project
- Add an "Android" app to your Firebase project, download the `googleservices.json` file and copy-paste it to `android/app/google-services.json`
- Add an "iOS" app to your Firebase project, download the `GoogleService-Info.plist` file and copy-paste it to `ios/GoogleService-Info.plist`
- Copy your connection settings to `.env.example` file
- Rename `.env.example` to `.env`
- Install dependencies using `yarn`
- Run locally using `yarn start`

## Deploy to Device (Android/iOS)

- Deploy to Android emulator using `yarn android`
- Deploy to iOS emulator using `yarn ios`

## Notes
- When deploying to android or iOS, ensure that your development machine has been setup accordingly
