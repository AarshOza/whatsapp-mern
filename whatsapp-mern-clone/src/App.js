import React, { useEffect, useState} from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Pusher from 'pusher-js';
import {instance,token} from './axios.js';
import {useStateValue} from './StateProvider'

function App() {

  const [{ user, ref_token }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      token.post('accounts:signInWithCustomToken?key=AIzaSyBMcQhXSTg1R89GK3zY2nr9R7ALRnhBMXw',{
        token: ref_token,
        returnSecureToken: true
      }).then(result => console.log(result))
        .catch(error => console.log(error))
    }
    else {
      return null
    }
  },[])


  useEffect(() => {
    instance.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  },[])

  useEffect(() => {
    //once
    const pusher = new Pusher('b2a67b977d0f9fd41725', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
  };
  }, [messages]);


  console.log(user)
  return (
    <div className="app">
      {!user ? (
        <Login />
      ):(
          <div className="app-body">
            <Sidebar />
            <Chat messages={messages} />
          </div>
      )
    }
    </div>
  );
}

export default App;
