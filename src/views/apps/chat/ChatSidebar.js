import React from "react"
import { 
  Card, 
  FormGroup, 
  Input, 
  Badge, 
  Modal, 
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  CardBody, 
  Row, 
  Col 
} from "reactstrap"
import Select from "react-select"
import { X, Search, Filter } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import { connect } from "react-redux"
import {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages
} from "../../../redux/actions/chat/index"
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";

const masterSKUOptions = [
  { value: "1", label: "Master SKU Group 1", color: "#00B8D9", isFixed: true },
  { value: "2", label: "Master SKU Group 2 ", color: "#0052CC", isFixed: true }
]


class ChatSidebar extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (
      props.chat.contactsByGroups.length !== state.contactsByGroups ||
      props.chat.chatContacts.length !== state.chatContacts ||
      props.chat.contacts.length !== state.contacts ||
      props.chat.chats.length !== state.chats ||
      props.chat.status !== state.status
    ) {
      return {
        contactsByGroups: props.chat.contactsByGroups,
        chatsContacts: props.chat.chatContacts,
        contacts: props.chat.contacts,
        chats: props.chat.chats,
        status: props.chat.status
      }
    }
    // Return null if the state hasn't changed
    return null
  }
  state = {
    contactsByGroups: [],
    chatsContacts: [],
    contacts: [],
    messages: [],
    status: null,
    value: "",
    modal: false,
    selected: []
  }

  getChatContents = () => {
    this.props.getChats()
    this.props.getContactChats()
  }

  async componentDidMount() {
    await this.getChatContents()
    this.setState({
      contactsByGroups: this.props.chat.contactsByGroups,
      chatsContacts: this.props.chat.chatContacts,
      contacts: this.props.chat.contacts,
      chats: this.props.chat.chats,
      status: this.props.chat.status
    })
  }

  handleOnChange = e => {
    this.setState({ value: e.target.value })
    this.props.searchContacts(e.target.value)
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  handleOnSelectionChange = (newValue) => {
    this.setState({
      selected: newValue
    })
  }

  handleOnFilter = () => {
    const { selected } = this.state;
    let contactsByGroups = [];
    if(selected.length > 0) {
      let filteruid = selected.map(i => {return i.value})
      this.props.chat.contactsByGroups.map(cg => {
        filteruid.map(f => {
          if(cg.uid.toString() === f) {
            contactsByGroups.push(cg);
          }
        })
      })
    } else {
      contactsByGroups = this.props.chat.contactsByGroups;
    }
    this.setState({ 
      modal: !this.state.modal,
      contactsByGroups: contactsByGroups
    })
  }

  renderChatsByGroup =  (value, data) => {
    const { chats } = this.state;
    const chatsArr = value.length
      ? this.props.chat.filteredChats
      : data;
    
    return (
      <>
        {chatsArr && Array.isArray(chatsArr)
        ? chatsArr.map(chat => {
            let lastMsg =
                chats[chat.uid] && chats[chat.uid].msg
                  ? chats[chat.uid].msg.slice(-1)[0]
                  : null,
              lastMsgDate = new Date(
                lastMsg && lastMsg.time ? lastMsg.time : null
              ),
              lastMsgMonth = lastMsgDate.toLocaleString("default", {
                month: "short"
              }),
              lastMsgDay = lastMsgDate.getDate()
            let pendingMsg =
              chats[chat.uid] && chats[chat.uid].msg
                ? chats[chat.uid].msg.filter(
                    i => i.isSeen === false && i.isSent !== true
                  ).length
                : null
            let activeID =
              chats[chat.uid] !== undefined ? chats[chat.uid] : null
            return (
              <li
                key={chat.uid}
                onClick={() => {
                  this.props.handleActiveChat(chat.uid, chat, activeID)
                  this.props.mainSidebar(false)
                  this.props.markSeenAllMessages(chat.uid)
                }}
                className={`${
                  this.props.activeChatID === chat.uid ? "active" : ""
                }`}
              >
                <div className="pr-1">
                  <span className="avatar avatar-md m-0">
                    <img
                      src={chat.photoURL}
                      alt={chat.displayName}
                      height="38"
                      width="38"
                    />
                  </span>
                </div>
                <div className="user-chat-info">
                  <div className="contact-info">
                    <h5 className="text-bold-600 mb-0">{chat.displayName}</h5>
                    <p className="truncate">
                      {lastMsg ? lastMsg.textContent : chat.about}
                    </p>
                  </div>
                  <div className="contact-meta d-flex- flex-column">
                    <span className="float-right mb-25">
                      {lastMsgMonth + " " + lastMsgDay}
                    </span>
                    {pendingMsg > 0 ? (
                      <div className="unseen-msg">
                        <Badge
                          className="badge-md float-right"
                          color="primary"
                          pill
                        >
                          {pendingMsg}
                        </Badge>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            )
          })
        : null}
      </>
    )
  }

  render() {
    const { contactsByGroups, contacts, chatsContacts, chats, status, value } = this.state;

    return (
      <React.Fragment>
      <Card className="sidebar-content h-100">
        <span
          className="sidebar-close-icon"
          onClick={() => this.props.mainSidebar(false)}
        >
          <X size={15} />
        </span>
        <div className="chat-fixed-search">
          <div className="d-flex align-items-center">
            <div className="sidebar-profile-toggle position-relative d-inline-flex">
              <div
                className="avatar"
                onClick={() => this.props.handleUserSidebar("open")}
              >
                <img src={userImg} alt="User Profile" height="40" width="40" />
                <span
                  className={
                    status === "dnd"
                      ? "avatar-status-busy"
                      : status === "away"
                      ? "avatar-status-away"
                      : status === "offline"
                      ? "avatar-status-offline"
                      : "avatar-status-online"
                  }
                />
              </div>
            </div>
            <FormGroup className="position-relative has-icon-left mx-1 my-0 w-100">
              <Input
                className="round"
                type="text"
                placeholder="Search phone or brand"
                onChange={e => this.handleOnChange(e)}
                value={value}
              />
              <div className="form-control-position">
                <Search size={15} />
              </div>
            </FormGroup>
            <Filter onClick={this.toggleModal} className="pointer" size={28}/>
          </div>
        </div>
        <PerfectScrollbar
          className="chat-user-list list-group"
          options={{
            wheelPropagation: false
          }}
        >
          <React.Fragment>
            {contactsByGroups.map(cg => {
              return (
                <div key={cg.uid}>
                  <h3 className="primary p-1 mb-0">{cg.displayName}</h3>
                  <ul className="chat-users-list-wrapper media-list">{this.renderChatsByGroup(value, cg.childs)}</ul>
                </div>
              )
            })}
          </React.Fragment>
          {/* <h3 className="primary p-1 mb-0">Master SKU 1</h3>
          <ul className="chat-users-list-wrapper media-list">{renderChats}</ul>
          <h3 className="primary p-1 mb-0">Master SKU 2</h3>
          <ul className="chat-users-list-wrapper media-list">{renderChats}</ul> */}
          {/* <ul className="chat-users-list-wrapper media-list">
            {renderContacts}
          </ul> */}
        </PerfectScrollbar>
      </Card>
      <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className='modal-dialog-centered'>
          <ModalHeader toggle={this.toggleModal}>Filter</ModalHeader>
          <ModalBody>
            <CardBody>
              <Row>
                <Col md="12" sm="12">
                  <h5 className="text-bold-600 my-1">Select masterSKU</h5>
                  <Select
                    defaultValue={this.state.selected}
                    isMulti
                    name="colors"
                    options={masterSKUOptions}
                    className="React"
                    onChange={this.handleOnSelectionChange}
                    classNamePrefix="select"
                  />
                </Col>
              </Row>
            </CardBody>
          </ModalBody>
          <ModalFooter>
              <Button color='primary' onClick={this.handleOnFilter}>
              OK
              </Button>
              <Button color='flat-danger' onClick={this.toggleModal}>
              Cancel
              </Button>
          </ModalFooter>
          </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    chat: state.chatApp.chats
  }
}
export default connect(mapStateToProps, {
  getChats,
  getContactChats,
  searchContacts,
  markSeenAllMessages
})(ChatSidebar)
