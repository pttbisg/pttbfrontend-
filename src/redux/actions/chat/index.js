import axios from "axios"
import {apiConfig} from "../../appConfig/app";
import moment from "moment";

const getPhotoURL = (type) => {
  if (type === "EMAIL") {
    return require('../../../assets/img/icons/email.png');
  }
  if (type === "WHATSAPP") {
    return require('../../../assets/img/icons/whatsapp.png');
  }
}
export const getConversations = () => {
  return dispatch => {
    axios
      .post(apiConfig.endpoint.conversations.getConversations)
      .then(response => {

        const masterSKUContactsGroups = Object.keys(response.data).map((tag, masterIndex) => {
          return {
            uid: tag.toLowerCase().replace( ' ', '_'),
            displayName: tag,
            phone: '12345',
            about: 'SKU description',
            photoURL: getPhotoURL(tag.messageType),
            childs: []
          }
        });

        console.log({masterSKUContactsGroups});

        const masterSKUContacts = Object.values(response.data).map((contacts, index) => {
          return Object.keys(contacts).map((contactKey) => {
            return {
              uid: contactKey,
              masterSKUGroupUid: contacts[contactKey][0].tag.toLowerCase().replace(' ', '_'),
              displayName: contactKey,
              about: "Master SKU Description",
              phone: "092345678",
              photoURL: getPhotoURL(contacts[contactKey][0].messageType),
              status: "offline"
            }
          })
        }).reduce( (contactsFlattened, item) => {
          contactsFlattened.push(...item)
          return contactsFlattened;
        }, []);

        /*const masterSKUContactsArray = masterSKUContacts.reduce( (contactsFlattened, item) => {
          contactsFlattened.push(...item)
          return contactsFlattened;
        }, []);*/

        const chatsArray = Object.values(response.data)
          .map((conversations) => {
            return Object.values(conversations)
          })
          .flat()
          .map((conversations) => {

            return {
              isPinned: false,
              conversationId: conversations[0].conversationId,
              msg: conversations.map((msg) => {
                return {
                  isSeen: true,
                  isSent: msg.messageDirection === 'Outbound',
                  textContent: msg.messageBody,
                  time: moment(msg.updated).format('hh:mm:ss DD-MM-YYYY')
                }
              })
            }
          })

        const chats = chatsArray.reduce((chatsObject, chats) => {
          chatsObject[chats.conversationId] = chats;
          return chatsObject;
        }, {});

        console.log({masterSKUContactsGroups},{masterSKUContacts},{chats});

        dispatch({
          type: "GET_CONTACTS",
          contacts: masterSKUContacts,
          contactsGroups: masterSKUContactsGroups,
          chats: chats
        })

      })
      .catch(err => console.log(err))
  }
}

export const getChats = () => {
  return dispatch => {
    axios
      .get("api/app/chat/chats")
      .then(response => {
        console.log('getChats', response);
        dispatch({
          type: "GET_CONTACTS",
          contacts: response.data.masterSKUContacts,
          contactsGroups: response.data.masterSKUContactsGroups,
          chats: []//response.data.chats
        })
      })
      .catch(err => console.log(err))
  }
}

export const getContactChats = () => {
  return dispatch => {
    axios
      .get("api/app/chat/chat-contacts")
      .then(response => {
        console.log('GET_CHAT_CONTACTS', response)
        dispatch({
          type: "GET_CHAT_CONTACTS",
          chats: response.data
        })
      })
      .catch(err => console.log(err))
  }
}

export const togglePinned = (id, value) => {
  return dispatch => {
    axios
      .post("/api/apps/chat/set-pinned/", {
        contactId: id,
        value
      })
      .then(response => {
        dispatch({
          type: "SET_PINNED",
          id,
          value
        })
      })
      .catch(err => console.log(err))
  }
}

export const sendMessage = (id, isPinned, text) => {
  if (text.length > 0) {
    return dispatch => {
      let newMsg = {
        textContent: text,
        isSent: true,
        isSeen: false,
        time: new Date().toString()
      }
      axios
        .post("/api/app/chat/send-message", {
          contactId: id,
          message: newMsg,
          isPinned
        })
        .then(response => {
          dispatch({
            type: "SEND_MESSAGE",
            msg: newMsg,
            id,
            isPinned,
            text
          })
          dispatch(getChats())
        })
        .catch(err => console.log(err))
    }
  } else {
    return
  }
}

export const changeStatus = status => {
  return dispatch => {
    dispatch({
      type: "CHANGE_STATUS",
      status
    })
  }
}

export const searchContacts = query => {
  return dispatch => {
    dispatch({
      type: "SEARCH_CONTACTS",
      query
    })
  }
}

export const markSeenAllMessages = id => {
  return dispatch => {
    axios
      .post("/api/apps/chat/mark-all-seen/", {
        contactId: id
      })
      .then(response => {
        dispatch({
          type: "MARK_AS_SEEN",
          id
        })
      })
      .catch(err => console.log(err))
  }
}
