import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";


const initializer = ()=>{
    const APP_ID= import.meta.env.VITE_APP_ID;
    const REGION = import.meta.env.VITE_REGION;
    const AUTH_KEY=import.meta.env.VITE_AUTH_KEY;

    const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(APP_ID)
    .setRegion(REGION)
    .setAuthKey(AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build()

    CometChatUIKit.init(UIKitSettings)
    .then(()=>{
        console.log("CometChat UI Kit initialized successfully.")
    })
    .catch((error)=>{
        console.log("CometChat UI Kit initialization failed: ",error)
    })
}


export default initializer