# Android Release Signing & Play Store Setup

## Status: Ready for Deployment ✅

Your app is now properly signed with a release keystore. The Play Store expects a different certificate from an earlier build. **You need to update the certificate with Google Play Support.**

### Your Current Release Certificate
- **SHA1**: `D7:2E:71:C4:C9:D3:5C:F5:51:0F:5A:ED:16:87:4E:F3:66:5A:8D:86`
- **Keystore Location**: `android/app/release.keystore`
- **Alias**: `release-key`
- **Valid**: 2026-04-10 to 2053-08-26

### What Play Store Expects
- **SHA1**: `5E:A4:3B:85:CC:57:B8:AA:71:C1:68:9B:4A:06:3C:34:69:51:CF:03`
- **Status**: Previous certificate (no longer available on this system) (Original release cert)

**Status**: The gradle configuration is properly set up. The issue is a certificate mismatch with Google Play.

---

## Resolving Play Store Certificate Mismatch

### The Problem
Google Play Console registered your app with certificate `5E:A4:3B:85:CC:57:B8:AA:71:C1:68:9B:4A:06:3C:34:69:51:CF:03`, but we cannot locate that original keystore on this system.

Your newly built App Bundle uses a new certificate: `D7:2E:71:C4:C9:D3:5C:F5:51:0F:5A:ED:16:87:4E:F3:66:5A:8D:86`

### Solution A: Update Certificate with Play Store Support ⭐ RECOMMENDED

Google Play Support can update the registered certificate for your app:

1. **Contact Google Play Support**:
   - Visit: https://support.google.com/googleplay/contact/developer_support
   - Select your app and choose "Certificates & Signing"
   
2. **Provide these details**:
   - **Package ID**: `com.rick.kuraapp`
   - **Old SHA1**: `5E:A4:3B:85:CC:57:B8:AA:71:C1:68:9B:4A:06:3C:34:69:51:CF:03`
   - **New SHA1**: `D7:2E:71:C4:C9:D3:5C:F5:51:0F:5A:ED:16:87:4E:F3:66:5A:8D:86`
   - **Reason**: "Lost access to original keystore, migrating to new signing key"
   
3. **After approval**, upload the new bundle:
   ```bash
   cd android
   ./gradlew bundleRelease
   # Upload android/app/build/outputs/bundle/release/app-release.aab to Play Store
   ```

### Solution B: Find and Use Original Keystore

If you have a backup of the original keystore with SHA1 `5E:A4:3B:85:CC:57:B8:AA:71:C1:68:9B:4A:06:3C:34:69:51:CF:03`:

1. **Search for it**:
   - Email attachments (check old emails from setup)
   - Cloud storage: Google Drive, Dropbox, OneDrive, AWS S3
   - External drives or USB backups
   - Team member systems
   - Password manager or secure notes
   - Previous computer or backup drive

2. **Set it up**:
   ```bash
   # Copy to project
   cp /path/to/original/release.keystore android/app/release.keystore
   
   # Update gradle.properties if password is different
   
   # Rebuild with original keystore
   cd android
   ./gradlew clean bundleRelease
   # Upload to Play Store
   ```

---

## Current Configuration Status ✅

| Item | Status | Details |
|------|--------|---------|
| Release Keystore | ✅ | `android/app/release.keystore` (SHA1: `D7:2E:71...`) |
| Gradle Properties | ✅ | All signing properties configured |
| build.gradle | ✅ | Release signing config added |
| App Bundle | ✅ | Can be built with `./gradlew bundleRelease` |
| Play Store Cert | ⏳ | Needs update or original keystore needed |

---

## Build Reference

**Create Release Bundle**:
```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

**Verify Bundle Certificate**:
```bash
keytool -list -v -keystore android/app/release.keystore -storepass 783256
```

---

## Important Security Notes

- **Never commit** `release.keystore` or passwords to git (already in `.gitignore`)
- For CI/CD, use environment variables: `KEYSTORE_PASSWORD`, `KEY_PASSWORD`
- Once a cert is used by Play Store, it cannot be easily changed
- Always keep a backup of your release keystore

---

## References

- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [Google Play Console Help](https://support.google.com/googleplay)
- [Gradle Plugin Documentation](https://developer.android.com/reference/tools/gradle-api/7.0/com/android/build/api/dsl/SigningConfig)
