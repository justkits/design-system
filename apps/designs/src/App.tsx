export function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "120vw",
        height: "120vh",
      }}
    >
      <h1>Tester App</h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        TestArea
      </div>
    </div>
  );
}
