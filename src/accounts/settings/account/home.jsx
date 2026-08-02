import { useNavigate } from "react-router";
import "./css/home.css";
import useTitle from "../../../components/UseTitle";

export default function AccountHome(){
  useTitle("Account settings");
  const navigate = useNavigate();
  
  const options = [
    {id: 1, icon: "smartphone", title: "Change Number", desc: "Update your phone number", onClick:() => navigate("/accounts/settings/account/change_phone")},
    {id: 2, icon: "devices", title: "Link Device", desc: "Manage devices", onClick: () => navigate("/accounts/settings/account/link_device")},
    {id: 3, icon: "delete", title: "Delete Account", desc: "Delete your account permanentely", onClick: () => navigate("/accounts/settings/account/delete_my_account")},
  ];

  return(
    <div className="account-main-container">
      <div className="account-header">
        <span className="material-symbols-outlined" onClick={() => navigate(-1)}>
          arrow_back
        </span>
        <h1>Account</h1>
      </div>
      <div className="account-content">
        {options.map(opt => (
          <div className="account-option-item" key={opt.id} onClick={opt.onClick}>
            <div className="account-option-header">
              <span className="material-symbols-outlined">{opt.icon}</span>
              <h1 className={opt.title === "Delete Account"? "danger-title" : ""}>{opt.title}</h1>
            </div>
            <div className="account-option-desc">
              <h2>{opt.desc}</h2>
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}