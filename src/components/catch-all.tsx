import { useState } from "react";
import { useResourceParams } from "@refinedev/core";
import { ErrorComponent } from "./refine-ui/layout/error-component";

export const RefineAiErrorComponent = () => {
  const { resource, action } = useResourceParams();
  const [isLoading, setIsLoading] = useState(false);

  if (!resource) {
    return <ErrorComponent />;
  }
  const resourceName = resource?.identifier || resource?.name;

  const onClickHandler = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    window.parent.postMessage(
      {
        type: "send-prompt",
        payload: `Create a new '${action}' page for the '${resourceName}' resource`,
      },
      "*",
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "456px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "24px",
          border: "1px solid #E3E4E5",
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={216}
          height={216}
          viewBox="0 0 216 216"
          fill="none"
        >
          <title>Refine</title>
          <circle cx={108} cy={108} r={108} fill="#F6F7F9" opacity={0.5} />
          <path
            fill="#E3E4E5"
            d="M59.792 159.569C51.868 176.597 41.734 192 31 192h154c-25.59 0-54.875-21.885-76.642-42.32-14.347-13.469-40.264-7.953-48.566 9.889Z"
            opacity={0.75}
          />
          <path
            stroke="#99A1B3"
            strokeDasharray="7.85 3.93"
            strokeLinecap="round"
            strokeWidth={2}
            d="M116.602 50.235c-7.177-4.144-16.286-1.704-34.494 3.175l-2.357.632c-6.925 1.855-10.383 2.782-13.246 4.77a22.76 22.76 0 0 0-1.52 1.164c-2.658 2.255-4.447 5.353-8.032 11.564-3.585 6.21-5.373 9.308-5.997 12.737-.11.63-.2 1.265-.247 1.899-.291 3.474.636 6.932 2.492 13.858l5.808 21.678M108 166c18.208 4.879 27.316 7.319 34.493 3.175 7.178-4.144 9.618-13.254 14.498-31.463l-.013.007 5.177-19.321c4.882-18.219 7.32-27.319 3.177-34.496-2.055-3.56-5.331-5.954-10.332-8.059"
            opacity={0.25}
          />
          <path
            fill="url(#a)"
            stroke="#99A1B3"
            strokeDasharray="7.85 3.93"
            strokeLinecap="round"
            strokeWidth={2}
            d="M147.99 118.006V98.004c0-18.862 0-28.283-5.86-34.143C136.27 58 126.84 58 107.99 58h-2.44c-7.17 0-10.75 0-14.03 1.18-.6.22-1.19.46-1.77.73-3.15 1.49-5.68 4.02-10.75 9.091-5.07 5.07-7.6 7.6-9.09 10.751-.27.58-.52 1.17-.73 1.77C68 84.802 68 88.383 68 95.554v22.442c0 18.862 0 28.283 5.86 34.143C79.72 158 89.15 158 108 158s28.28 0 34.14-5.861c5.86-5.86 5.86-15.291 5.86-34.143l-.01.01Z"
          />
          <path
            fill="#99A1B3"
            d="M48 158a2 2 0 0 1 2 2v14h2a2 2 0 0 0 2-2v-8a2 2 0 1 1 4 0v8a6 6 0 0 1-6 6h-2v14h-4v-10h-2a6 6 0 0 1-6-6v-4a2 2 0 1 1 4 0v4a2 2 0 0 0 2 2h2v-18a2 2 0 0 1 2-2Z"
            opacity={0.5}
          />
          <path
            stroke="#99A1B3"
            strokeLinecap="round"
            strokeWidth={2}
            d="M28 192h160"
          />
          <defs>
            <linearGradient
              id="a"
              x1={108}
              x2={108}
              y1={58}
              y2={158}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EAEBEF" />
              <stop offset={1} stopColor="#EAEBEF" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            maxWidth: "360px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: "600",
              color: "#23272F",
              marginTop: "16px",
            }}
          >
            Page not created yet.
          </h2>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#23272F",
              marginTop: "8px",
            }}
          >
            We couldn’t find a component for the requested page.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "16px",
              width: "100%",
              maxWidth: "360px",
              color: "#667084",
              borderRadius: "8px",
              border: "1px solid #EAEBEF",
              padding: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ fontSize: "14px", lineHeight: "20px" }}>
                resource:{" "}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  background: "#F6F7F9",
                  padding: "4px 8px",
                  borderRadius: "8px",
                }}
              >
                "{resourceName}"
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ fontSize: "14px", lineHeight: "20px" }}>
                action:{" "}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  background: "#F6F7F9",
                  padding: "4px 8px",
                  borderRadius: "8px",
                }}
              >
                "{action}"
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#23272F",
              marginTop: "16px",
            }}
          >
            Would you like to ask Refine to create this page?
          </p>

          <button
            type="button"
            disabled={isLoading}
            onClick={onClickHandler}
            style={{
              appearance: "none",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              background: "#575FB7",
              color: "#fff",
              paddingLeft: "14px",
              paddingRight: "20px",
              paddingTop: "14px",
              paddingBottom: "14px",
              borderRadius: "8px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            {isLoading ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Loading...</title>
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 10 10; 360 10 10"
                    dur="1s"
                    repeatCount="indefinite"
                  />

                  <path
                    d="M12.6388 0.833496L13.1371 1.76497C13.474 2.39472 13.6424 2.70959 13.5311 2.84444C13.4197 2.97929 13.0528 2.87038 12.3192 2.65257C11.5857 2.43479 10.8069 2.31762 9.99992 2.31762C5.62766 2.31762 2.08325 5.75722 2.08325 10.0002C2.08325 11.3994 2.46877 12.7115 3.14236 13.8415M7.36103 19.1669L6.86272 18.2354C6.52582 17.6056 6.35737 17.2907 6.46875 17.1559C6.58014 17.021 6.94699 17.13 7.68066 17.3478C8.41417 17.5655 9.19292 17.6827 9.99992 17.6827C14.3722 17.6827 17.9166 14.2431 17.9166 10.0002C17.9166 8.60087 17.5311 7.28889 16.8575 6.15889"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
              >
                <title>Create Page</title>
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.25}
                  d="M3.833 10v2.12c0 2.705 0 4.057.739 4.973.149.185.317.353.502.502.916.739 2.268.739 4.972.739.588 0 .882 0 1.152-.095.056-.02.11-.043.164-.068.258-.123.465-.331.881-.747l3.947-3.947c.482-.482.723-.723.85-1.03.127-.305.127-.646.127-1.327V8.334c0-3.143 0-4.714-.977-5.69-.882-.883-2.251-.968-4.828-.976m-.029 16.25V17.5c0-2.357 0-3.535.732-4.267.733-.732 1.911-.732 4.268-.732h.417M10.5 5H3.833m3.334-3.334v6.667"
                />
              </svg>
            )}
            {isLoading ? "Creating page" : "Create Page"}
          </button>
        </div>
      </div>
    </div>
  );
};
