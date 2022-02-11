import axios from "axios";
import { apiConfig } from "../../appConfig/app";
import moment from "moment";
import { groupBy } from "lodash";

const getPhotoURL = (type) => {
  if (type === "EMAIL") {
    return require("../../../assets/img/icons/email.png");
  }
  if (type === "WHATSAPP") {
    return require("../../../assets/img/icons/whatsapp.png");
  }
};
export const getConversations = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return (dispatch) => {
      axios
        .get(
          apiConfig.endpoint.conversations.getConversations +
            `?user_id=${user.id}`
        )
        .then((response) => {
          let existingMasterSKUContactsGroupsIds = [];
          let existingMasterSKUContacts = {};

          let masterSKUContactsGroups = response.data.reduce(
            (previousValue, currentValue) => {
              const currentUid = currentValue.master_sku_name
                ?.toLowerCase()
                ?.replace(" ", "_");

              if (existingMasterSKUContactsGroupsIds.includes(currentUid)) {
                return previousValue;
              } else {
                existingMasterSKUContactsGroupsIds.push(currentUid);

                return [
                  ...previousValue,
                  {
                    uid: currentUid,
                    displayName: currentValue.master_sku_name,
                    about: "SKU description",
                    childs: [],
                  },
                ];
              }
            },
            []
          );

          const masterSKUContacts = response.data.reduce(
            (previousValue, currentValue) => {
              const masterSKUGroupUid = currentValue.master_sku_name
                ?.toLowerCase()
                ?.replace(" ", "_");
              const currentUid = masterSKUGroupUid + currentValue.mobile_phone;

              if (
                existingMasterSKUContacts[currentUid]?.includes(
                  masterSKUGroupUid
                )
              ) {
                return previousValue;
              } else {
                if (existingMasterSKUContacts[currentUid]) {
                  existingMasterSKUContacts[currentUid] = [
                    ...existingMasterSKUContacts[currentUid],
                    masterSKUGroupUid,
                  ];
                } else {
                  existingMasterSKUContacts[currentUid] = [masterSKUGroupUid];
                }

                return [
                  ...previousValue,
                  {
                    uid: currentUid,
                    masterSKUGroupUid,
                    displayName: currentValue.mobile_phone,
                    about: "Master SKU Description",
                    phone: currentValue.mobile_phone,
                    photoURL: getPhotoURL(currentValue.message_type),
                    status: "offline",
                  },
                ];
              }
            },
            []
          );

          /*const masterSKUContactsArray = masterSKUContacts.reduce( (contactsFlattened, item) => {
          contactsFlattened.push(...item)
          return contactsFlattened;
        }, []);*/

          const chatsGroupByMasterSKU = groupBy(
            response.data,
            "master_sku_name"
          );

          // const a = response.data.reduce((previousValue, currentValue) => {
          //   const masterSKUGroupUid = currentValue.master_sku_name
          //       ?.toLowerCase()
          //       ?.replace(" ", "_");
          //     const currentUid = masterSKUGroupUid + currentValue.mobile_phone;

          //   if(previousValue[currentUid)
          // },
          // []);

          // console.log(chatsGroupByMasterSKU, "chatsGroupByMasterSKU");

          const chatsArray = response.data.map((conversation) => {
            return {
              isPinned: false,
              conversationId: conversation.mobile_phone,
              msg: {
                isSeen: true,
                isSent: conversation.message_direction === "Outbound",
                textContent: conversation.message_body,
                time: moment(conversation.created_at).format(
                  "hh:mm:ss DD-MM-YYYY"
                ),
              },
            };
          });

          const chats = groupBy(chatsArray, "conversationId");

          console.log(
            { masterSKUContactsGroups },
            { masterSKUContacts },
            { chats }
          );

          dispatch({
            type: "GET_CONTACTS",
            contacts: masterSKUContacts,
            contactsGroups: masterSKUContactsGroups,
            chats: chats,
          });
        })
        .catch((err) => console.log(err));
    };
  }

  return [];
};

export const getChats = () => {
  return (dispatch) => {
    axios
      .get("api/app/chat/chats")
      .then((response) => {
        console.log("getChats", response);
        dispatch({
          type: "GET_CONTACTS",
          contacts: response.data.masterSKUContacts,
          contactsGroups: response.data.masterSKUContactsGroups,
          chats: [], //response.data.chats
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getContactChats = () => {
  return (dispatch) => {
    axios
      .get("api/app/chat/chat-contacts")
      .then((response) => {
        console.log("GET_CHAT_CONTACTS", response);
        dispatch({
          type: "GET_CHAT_CONTACTS",
          chats: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const togglePinned = (id, value) => {
  return (dispatch) => {
    axios
      .post("/api/apps/chat/set-pinned/", {
        contactId: id,
        value,
      })
      .then((response) => {
        dispatch({
          type: "SET_PINNED",
          id,
          value,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const sendMessage = (id, isPinned, text) => {
  if (text.length > 0) {
    return (dispatch) => {
      let newMsg = {
        textContent: text,
        isSent: true,
        isSeen: false,
        time: new Date().toString(),
      };
      axios
        .post("/api/app/chat/send-message", {
          contactId: id,
          message: newMsg,
          isPinned,
        })
        .then((response) => {
          dispatch({
            type: "SEND_MESSAGE",
            msg: newMsg,
            id,
            isPinned,
            text,
          });
          dispatch(getChats());
        })
        .catch((err) => console.log(err));
    };
  } else {
    return;
  }
};

export const changeStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_STATUS",
      status,
    });
  };
};

export const searchContacts = (query) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_CONTACTS",
      query,
    });
  };
};

export const markSeenAllMessages = (id) => {
  return (dispatch) => {
    axios
      .post("/api/apps/chat/mark-all-seen/", {
        contactId: id,
      })
      .then((response) => {
        dispatch({
          type: "MARK_AS_SEEN",
          id,
        });
      })
      .catch((err) => console.log(err));
  };
};
