# EAS Build Setup Guide

## Prerequisites

1. **Install EAS CLI globally:**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **Login to your Expo account:**
   ```bash
   eas login
   ```

3. **Configure your project:**
   ```bash
   eas build:configure
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_STORAGE_URL=your_supabase_storage_url_here

# EAS Build Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EXPO_PUBLIC_SUPABASE_STORAGE_URL=your_supabase_storage_url_here
```

## Build Commands

### Development Build (Recommended for testing)
```bash
# Android Development Build
eas build --platform android --profile development

# iOS Development Build
eas build --platform ios --profile development

# Both platforms
eas build --platform all --profile development
```

### Preview Build (Internal distribution)
```bash
# Android Preview Build
eas build --platform android --profile preview

# iOS Preview Build
eas build --platform ios --profile preview

# Both platforms
eas build --platform all --profile preview
```

### Production Build
```bash
# Android Production Build
eas build --platform android --profile production

# iOS Production Build
eas build --platform ios --profile production

# Both platforms
eas build --platform all --profile production
```

## Build Profiles

### Development Profile
- **Development Client**: Enabled
- **Distribution**: Internal
- **Resource Class**: Medium
- **Use Case**: Testing with development features

### Preview Profile
- **Distribution**: Internal
- **Resource Class**: Medium
- **Use Case**: Internal testing and QA

### Production Profile
- **Auto Increment**: Enabled
- **Resource Class**: Medium
- **Use Case**: App Store/Play Store release

## Installation

After building, install the development client:

```bash
# Install development client
npx expo install expo-dev-client

# For Android, you can install the APK directly
# For iOS, you'll need to install via TestFlight or direct installation
```

## Troubleshooting

1. **Build fails with environment variables:**
   - Ensure all environment variables are set in EAS dashboard
   - Check that `.env` file is properly configured

2. **iOS build issues:**
   - Ensure you have proper Apple Developer account
   - Check bundle identifier matches your provisioning profile

3. **Android build issues:**
   - Ensure you have proper keystore configuration
   - Check package name matches your configuration

## Useful Commands

```bash
# Check build status
eas build:list

# View build logs
eas build:view

# Cancel a build
eas build:cancel

# Update EAS CLI
npm install -g @expo/eas-cli@latest
```

## Notes

- Development builds include the development client for hot reloading
- Preview builds are for internal testing without development features
- Production builds are optimized for app store distribution
- All builds use medium resource class for faster builds 