// UMN.LIFE – Human Video Chat Widget (V1)
// Embed-only. No HTML. No backend.

(function () {
  const DAILY_ROOM_URL = "https://umn.daily.co/UMN"; // 🔴 CHANGE THIS

  // ===== LAUNCH BUTTON =====
  const launcher = document.createElement("button");
  launcher.innerText = "Talk to a human";
  Object.assign(launcher.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "14px 18px",
    borderRadius: "999px",
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    zIndex: "999999",
    fontSize: "14px"
  });
  document.body.appendChild(launcher);

  // ===== OVERLAY =====
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.6)",
    display: "none",
    zIndex: "999998"
  });
  document.body.appendChild(overlay);

  // ===== MODAL =====
  const modal = document.createElement("div");
  Object.assign(modal.style, {
    position: "fixed",
    inset: "10%",
    background: "#000",
    borderRadius: "12px",
    overflow: "hidden",
    display: "none",
    zIndex: "999999"
  });
  document.body.appendChild(modal);

  // ===== HEADER =====
  const header = document.createElement("div");
  header.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;
                padding:10px 14px;background:#000;color:#fff;font-family:sans-serif">
      <strong>UMN.LIFE</strong>
      <button id="umn-close" style="background:none;border:none;color:#fff;
              font-size:20px;cursor:pointer">×</button>
    </div>
  `;
  modal.appendChild(header);

  // ===== VIDEO CONTAINER =====
  const videoWrap = document.createElement("div");
  Object.assign(videoWrap.style, {
    width: "100%",
    height: "100%",
    background: "#000"
  });
  modal.appendChild(videoWrap);

  let callFrame = null;

  // ===== OPEN =====
  launcher.onclick = () => {
    overlay.style.display = "block";
    modal.style.display = "block";

    if (!callFrame) {
      callFrame = window.DailyIframe.createFrame(videoWrap, {
        showLeaveButton: true,
        iframeStyle: {
          width: "100%",
          height: "100%",
          border: "0"
        }
      });

      callFrame.join({ url: DAILY_ROOM_URL });
    }
  };

  // ===== CLOSE =====
  header.querySelector("#umn-close").onclick = () => {
    overlay.style.display = "none";
    modal.style.display = "none";

    if (callFrame) {
      callFrame.leave();
      callFrame.destroy();
      callFrame = null;
    }
  };

  // ===== LOAD DAILY SCRIPT =====
  if (!window.DailyIframe) {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@daily-co/daily-js";
    script.async = true;
    document.head.appendChild(script);
  }
})();

