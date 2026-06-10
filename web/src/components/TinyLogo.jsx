import app_logo from "../assets/app_logo.png";

function LogoHeader(){
  return (
<div className="app-logo-tiny" style={{
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center',
  justifyContent: 'center',
  margin: 12, 
  fontSize: 20, 
  fontWeight: 'bold',
  textAlign: 'left', 
  gap: 10,
  padding: 30
}}>
  <img src={app_logo} style={{width: 30, height: 30, objectFit: 'contain', borderRadius: 10}} />
  Cirqle
</div>
  );
}
export default LogoHeader;