import PostList from './components/PostList'; 
import newellLogo from './newell.svg'; // Import the log
function App() {
  return (
    <div className="App">

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <img 
          src={newellLogo} 
          alt="Newell Logo" 
          style={{ width: "150px", height: "auto" }} 
        />
      </div>
        <PostList /> 
    </div>
  );
}

export default App;
