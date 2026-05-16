import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Firebase app is initialized automatically with google-services.json

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '295315686860-jqjhu16j6t5rsjvf1meaep07brlsubvi.apps.googleusercontent.com', // From google-services.json
});

export const _signInWithGoogle = async (): Promise<{ userInfo: any | null }> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return { userInfo: response.data };
    } else {
      return { userInfo: null };
    }
  } catch (error) {
    if (isErrorWithCode(error as any)) {
      const googleError = error as { code: string };
      switch (googleError.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
    return { userInfo: null };
  }
};
