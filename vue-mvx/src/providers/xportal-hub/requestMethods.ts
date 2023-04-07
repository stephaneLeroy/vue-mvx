import {PlatformsEnum} from "./native-auth/detectCurrentPlatform";

export enum WebViewProviderRequestEnums {
    signTransactionsRequest = 'SIGN_TRANSACTIONS_REQUEST',
    signMessageRequest = 'SIGN_MESSAGE_REQUEST',
    loginRequest = 'LOGIN_REQUEST',
    logoutRequest = 'LOGOUT_REQUEST',
    reloginRequest = 'RELOGIN_REQUEST'
}
export enum WebViewProviderResponseEnums {
    signTransactionsResponse = 'SIGN_TRANSACTIONS_RESPONSE',
    signMessageResponse = 'SIGN_MESSAGE_RESPONSE',
    loginResponse = 'LOGIN_RESPONSE',
    reloginResponse = 'RELOGIN_RESPONSE'
}

export const targetOrigin =
    typeof window != 'undefined' ? window?.parent?.origin ?? '*' : '*';

export const requestMethods = {
  signTransactions: {
    [PlatformsEnum.ios]: (transactions: any) =>
      (window as any).webkit.messageHandlers.signTransactions.postMessage(
        transactions,
        targetOrigin
      ),
    [PlatformsEnum.reactNative]: (message: any) =>
      (window as any)?.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.signTransactionsRequest,
          message
        })
      ),

    [PlatformsEnum.web]: (message: any) =>
      (window as any)?.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.signTransactionsRequest,
          message
        }),
        targetOrigin
      )
  },
  signMessage: {
    [PlatformsEnum.ios]: (message: string) =>
      (window as any).webkit.messageHandlers.signMessage.postMessage(message),
    [PlatformsEnum.reactNative]: (message: any) =>
      (window as any)?.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.signMessageRequest,
          message
        })
      ),
    [PlatformsEnum.web]: (message: any) =>
      (window as any)?.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.signMessageRequest,
          message
        }),
        targetOrigin
      )
  },
  logout: {
    [PlatformsEnum.ios]: () =>
      (window as any).webkit.messageHandlers.logout.postMessage(),
    [PlatformsEnum.reactNative]: () =>
      (window as any)?.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.logoutRequest
        })
      ),
    [PlatformsEnum.web]: () =>
      (window as any)?.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.logoutRequest
        }),
        targetOrigin
      )
  },
  login: {
    [PlatformsEnum.ios]: () =>
      (window as any).webkit.messageHandlers.login.postMessage(),
    [PlatformsEnum.reactNative]: () =>
      (window as any)?.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.loginRequest
        })
      ),
    [PlatformsEnum.web]: () =>
      (window as any)?.postMessage(
        JSON.stringify({
          type: WebViewProviderRequestEnums.loginRequest
        }),
        targetOrigin
      )
  }
};
