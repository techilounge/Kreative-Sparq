export const socialImageAlt =
  "Kreative Sparq — Ideas that move people. Marketing that moves business.";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function SocialImageArtwork() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#152011",
        color: "#F4F5F2",
        padding: "74px 82px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 26,
          letterSpacing: "0.02em",
        }}
      >
        <span>Kreative Sparq</span>
        <span style={{ color: "#F06A3C" }}>
          Strategy, creative &amp; digital marketing
        </span>
      </div>
      <div
        style={{ display: "flex", maxWidth: 970, fontSize: 78, lineHeight: 1 }}
      >
        Ideas that move people. Marketing that moves business.
      </div>
      <div
        style={{
          width: "100%",
          height: 2,
          display: "flex",
          background: "#F06A3C",
        }}
      />
    </div>
  );
}
