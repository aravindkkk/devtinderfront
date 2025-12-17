import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId }             = useParams();
  const [ messages, setMessages ]    = useState([])
  const [ newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
     
    const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });

     const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg.senderId.firstName,
        lastName: msg.senderId.lastName,
        text: msg.text
      }
      
     }) 

      setMessages(chatMessages);
  }

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

   useEffect(() => {
      const socket = createSocketConnection();
      if(!userId){
        return;
      }
      socket.emit("joinChat", {userId, targetUserId});

      socket.on("messageReceived", ({firstName, lastName, userId, text}) => {
          
        setMessages((messages) => [...messages, {firstName, lastName, userId, text}]);

      });

      
      return () => {
        socket.disconnect();
      };

    }, [userId, targetUserId]);

    const sendMessage = () => {
      const socket = createSocketConnection();
      socket.emit("sendMessage", {
        firstName:user.firstName,
        lastName:user.lastName, 
        userId, 
        targetUserId,
        text:newMessage
      })
      setNewMessage("");
    }
  
  return (
    <div >
    <h1>Chat</h1>
    { messages.map((msg, index) => {
            return (
            <div key={index} className={`chat ${user.firstName === msg.firstName ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-header">
                {msg.firstName + " " + msg.lastName}
            <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            </div>
        )
    })}

    <input 
    value = {newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    type="text" placeholder="Type here" className="input" />
    <div> <button onClick={sendMessage} className="btn btn-outline btn-secondary">Send</button></div>
    </div>
    
  )
}

export default Chat