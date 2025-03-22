import { useEffect, useState } from "react";
import { CometChatMessageComposer, CometChatMessageHeader, CometChatMessageList } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import '../styles/Chat.css'
import { useAuthContext } from "../hooks/useAuthContext";
import { Loader } from "semantic-ui-react";
import toast from "react-hot-toast";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const {user} = useAuthContext();
  useEffect(() => {
    // CometChat.getLoggedinUser().then(
    //   (loggedUser) => {
    //     if (loggedUser) {
    //       fetchUser(user);
    //     } else {
    //       // Login the user first
    //       console.log("User not logged in")
    //     }
    //   },
    //   (error) => {
    //     console.error("Error checking logged in user:", error);
    //     setLoading(false);
    //   }
    // );

    const fetchUser = (user) => {
      if(user){
        CometChat.getUser("cometchat-uid-1").then(
          (user) => {
            console.log("Fetched User:", user);
            setSelectedUser(user);
            setLoading(false);
          },
          (error) => {
            toast.error("Error fetching user ")
            console.error("User fetching failed:", error);
            setLoading(false);
          }
        );
      }
    };

    fetchUser(user)

  }, [user]);

  if(loading){
    return <Loader/>
  }

  return (
    <>
      {selectedUser && (
        <div className="messages-wrapper">
          <CometChatMessageHeader user={selectedUser}  />
          <CometChatMessageList user={selectedUser}  />
          <CometChatMessageComposer user={selectedUser}  />
        </div>
      ) }
      {!selectedUser && 
        <div className="empty-conversation">Please set a user or group in App.tsx.</div>
  }
    </>
  );
};

export default Chat;