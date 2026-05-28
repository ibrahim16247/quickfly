# QuickFly - Flight Search App

A React Native/Expo flight search application with multilingual support (English & Bengali).

## Quick Start

### Prerequisites
- Node.js and npm installed
- Expo Go app on your phone (or Android/iOS simulator)

### Installation & Running

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go app on your phone to test.

### Available Scripts

- `npm start` — Start Expo development server
- `npm run android` — Start on Android simulator
- `npm run ios` — Start on iOS simulator
- `npm run web` — Start on web

## Features

- ✈️ Flight search with demo data
- 🌐 Multilingual support (English & Bengali)
- 📱 Responsive design for mobile
- 🔗 External booking links
- 💾 Demo flight results with pricing

## Next Steps

### Building for iOS

To create a standalone `.ipa` file, you need an Apple Developer Account:

1. Install EAS CLI: `npm install -g eas-cli`
2. Configure your project: `eas build --platform ios`
3. Follow the prompts to sign and build

(Requires Apple Developer Account)

### Customization

- Modify flight data in `searchTickets()` function in `App.js`
- Update translations in the `en` and `bn` objects
- Customize colors and styles in the `StyleSheet.create()` section
- Update app icon: replace `assets/icon.png` with your 1024x1024 icon

## Notes

- This app uses demo data for demonstration purposes
- External booking links redirect to Google search (customize as needed)
- RTL layout can be enabled for Arabic support in future versions

## License

MIT