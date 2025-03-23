import { useEffect, useState } from "react";
import { CometChatMessageComposer, CometChatMessageHeader, CometChatMessageList } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import '../styles/Chat.css'
import { useAuthContext } from "../hooks/useAuthContext";
import { Loader } from "semantic-ui-react";
import toast from "react-hot-toast";
import { CometChatUsers } from "@cometchat/chat-uikit-react";


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
  function handleOnItemClick(user=CometChat.User){
    console.log(user, "your custom on item click action");
    setSelectedUser(user);
  }

  if(loading){
    return <Loader/>
  }

  return (
    <div className="chat_container">
     <div className="chat_users"> <CometChatUsers onItemClick={handleOnItemClick}/></div>
     <div className="chat_message_container">  {selectedUser && (
        <div className="messages-wrapper">
          <CometChatMessageHeader user={selectedUser}  hideBackButton={true}  />
          <CometChatMessageList user={selectedUser}  />
          <CometChatMessageComposer user={selectedUser}  />
        </div>
      ) }
      {!selectedUser && 
        <div className="empty-conversation">Please set a user or group in App.tsx.</div>
  }</div>
    </div>
  );
};

export default Chat;