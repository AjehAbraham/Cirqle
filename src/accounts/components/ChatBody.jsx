import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/chat_body.css";
import app_logo from "../../assets/app_logo.png";
import ContactList from "./ContactList.jsx";

function ChatBody() {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setSearch("");
  }, [openContact]);

  const handleContact = () => setOpenContact(true);
  const viewMessage = (id) => navigate(`/accounts/message/${id}/view`);

  const formatDate = (date) => {
    const now = new Date();
    const msgDate = new Date(date);
    const diffMs = now - msgDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return msgDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return msgDate.toLocaleDateString('en-US', { weekday: 'short' });
    return msgDate.toLocaleDateString('en-GB');
  };

  const renderStatus = (sender, status) => {
    if (sender!== "you") return null;
    const tick = status === "sent"? "check" : status === "fail" ? "error" : "done_all";
    return <span className="material-symbols-outlined" style={{color: status === "fail" ? "rgba(202,0,0)": status === "sent" ? "#aaa" : status === "delivered" ? "#aaa" : "#00F5D4"}}>{tick}</span>;
  };

  const getPreview = (conv) => {
    if (conv.msgType === "system") {
      if (conv.lastMsg === "photo") return "📷 Photo";
      if (conv.lastMsg === "attachment") return "📎 Attachment";
      if (conv.lastMsg.includes("deleted")) return "This message was deleted";
    }
    return conv.lastMsg;
  };

  const conversations = [
    { id: "1", avatar: app_logo, name: "Zainab Muhammed", cCode: "+234", tel: "8036295994", type: "dm", lastMsg: "I know what am trying to say", sender: "you", At: new Date(Date.now() - 1000*60*30), msgType: "text", status: "sent" },
    { id: "2", avatar: app_logo, name: "Ajeh Abraham", cCode: "+234", tel: "9061748136", type: "dm", lastMsg: "Bro i dey come", sender: "them", At: new Date(Date.now() - 1000*60*60*25), msgType: "text", status: "seen" },
    { id: "3", avatar: app_logo, name: "Mike Chan", cCode: "+91", tel: "776845567", type: "dm", lastMsg: "Hello, i've been trying to reach out but you haven't been giving me any positive reply yet and am wondering what the issue was.", sender: "you", At: new Date(Date.now() - 1000*60*60*3), msgType: "text", status: "fail" },
    { id: "4", avatar: app_logo, name: "UNI AGRIC(FCS)", cCode: "", tel: [], type: "group", lastMsg: "Hello,thanks for adding me!!", sender: "you", At: new Date(Date.now() - 1000*60*60*24*2), msgType: "text", status: "delivered" },
    { id: "5", avatar: app_logo, name: "Serah Johnson", cCode: "+234", tel: "8036815672", type: "dm", lastMsg: "photo", sender: "you", At: new Date(Date.now() - 1000*60*60*24*8), msgType: "system", status: "seen" }
  ];

  const filteredconvo = conversations
   .filter((conv) => {
      const matchSearch =
        conv.name.toLowerCase().includes(search.toLowerCase()) ||
        conv.tel.toString().includes(search) ||
        conv.lastMsg.toLowerCase().includes(search.toLowerCase()) ||
        conv.type.toLowerCase().includes(search.toLowerCase());

      let matchFilter = true;
      if (filter === "unread") {
        matchFilter = conv.sender === "you" && conv.status!== "seen";
      }
      if (filter === "groups") {
        matchFilter = conv.type === "group";
      }

      return matchSearch && matchFilter;
    })
   .sort((a, b) => new Date(b.At) - new Date(a.At));
  const groupNavigator = () => {
    navigate("/accounts/create-group");
  }
  return (
    <>

    <div className="container-container-wrapper">
      <ContactList isOpen={openContact} onClose={() => setOpenContact(false)} />

      <div className="top-container-wrapper">
        <input
          type="search"
          placeholder="Search contact, messages or groups"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="material-symbols-outlined add-btn" onClick={handleContact} id="xan">add</span>
      </div>

      <div className="sorting-list-container">
        <div className="filter-options">
          <p className={filter === 'all'? 'filter-active' : ''} onClick={() => setFilter('all')}>All</p>
          <p className={filter === 'unread'? 'filter-active' : ''} onClick={() => setFilter('unread')}>Unread</p>
          <p className={filter === 'groups'? 'filter-active' : ''} onClick={() => setFilter('groups')}>Groups</p>
          <span className="material-symbols-outlined" onClick={groupNavigator}>add_circle</span>
        </div>
      </div>

      <div className="message-container">
        {filteredconvo.length > 0? (
          filteredconvo.map(conv => (
            <div
              className="content-wrapper"
              key={conv.id}
              onClick={() => viewMessage(conv.id)}
            >
              <div className="image-case">
                <img src={conv.avatar || app_logo} alt={conv.name} />
              </div>
              <div className="content">
                <div className="info">
                  <p>{conv.name}{conv.type === 'group' && ' 👥'}</p>
                  <p>{formatDate(conv.At)}</p>
                </div>
                <div className="message-message">
                  <p>
{(() => {
  const text = getPreview(conv);
  return text.length > 20 ? text.substring(0, 30) + "  ..." : text;
})()}
                    {/*getPreview(conv).split(' ').slice(0, 5).join(' ')
                    */}
                  </p>
                  <p>{renderStatus(conv.sender, conv.status)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined">search_off</span>
            <p>No conversations found</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default ChatBody;