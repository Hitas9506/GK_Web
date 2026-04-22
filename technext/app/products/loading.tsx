export default function ProductsLoading() {
  return (
    <div style={{ paddingTop: "92px" }}>
      {/* Header skeleton */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A1A, #2d2d2d)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div
          className="skeleton"
          style={{
            height: "36px",
            width: "280px",
            borderRadius: "8px",
            margin: "0 auto 0.75rem",
          }}
        />
        <div
          className="skeleton"
          style={{
            height: "20px",
            width: "180px",
            borderRadius: "6px",
            margin: "0 auto",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
        }}
      >
        {/* Filter skeletons */}
        <div
          style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem" }}
        >
          {[120, 80, 110, 130, 100].map((w, i) => (
            <div
              key={i}
              className="skeleton"
              style={{
                height: "38px",
                width: `${w}px`,
                borderRadius: "2rem",
              }}
            />
          ))}
        </div>

        {/* Product card skeletons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                className="skeleton"
                style={{ aspectRatio: "4/5", width: "100%" }}
              />
              <div style={{ padding: "1rem" }}>
                <div
                  className="skeleton"
                  style={{
                    height: "14px",
                    width: "60px",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <div
                  className="skeleton"
                  style={{
                    height: "16px",
                    width: "90%",
                    borderRadius: "4px",
                    marginBottom: "0.35rem",
                  }}
                />
                <div
                  className="skeleton"
                  style={{
                    height: "16px",
                    width: "70%",
                    borderRadius: "4px",
                    marginBottom: "0.75rem",
                  }}
                />
                <div
                  className="skeleton"
                  style={{
                    height: "20px",
                    width: "50%",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
