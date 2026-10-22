import { createPortal } from "react-dom";

export default function Loader({ title, isOpen }) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="loader-container-overlay" style={loaderOverlay}>
        <div className="loader" style={loader}></div>
        <p style={p}>{title ?? "Please wait..."}</p>
      </div>
    </>,
    document.body
  );
}

const loaderOverlay = {
  inset: 0, 
  zIndex: 9999,
  position: "fixed",
  backgroundColor: "rgba(0,0,0,0.4)",
  backdropFilter: "blur(5px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", 
  alignItems: "center",
  width: "100%", 
  height: "100%"
};

const loader = {
  width: "52px",
  height: "52px",
  padding: "5px",
  borderRadius: "50%",
  border: "4px solid #ddd",
  borderTop: "4px solid #00F5D4",
  animation: "spin 1s linear infinite"
};

const p = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#fff",
  marginTop: "12px"
};