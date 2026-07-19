import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login(){
   const { login } = useContext(AuthContext);
   const navigate = useNavigate();
   
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();

    if(!username || !password){
        setError("All fields are required");
        return;
    }

    if(password.length < 6){
        setError("Password must be at least 6 characters");
        return;
    }

    setError("");
    setLoading(true);

    const result = await login({
        username,
        password,
    });

    if(result.success) {
        navigate("/posts");
    } else {
        setError(result.message);
    }
    setLoading(false);
   };
   
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-96">
         <h1 className="text-3xl font-bold mb-6 text-center">
             NewsBoard Login
         </h1>

         {
            error && (
                <p className="text-red-500 mb-4">
                    {error}
                </p>
            )
         }

         <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          value={username}
          onChange={(e)=> setUsername(e.target.value)} 
          />

          <input 
           type="text"
           placeholder="Password"
           className="w-full border p-2 mb-4 rounded"
           value={password}
           onChange = {(e) => setPassword(e.target.value)}
          />

          <button 
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
          >
          {loading ? "Loggin in..." : "Login"}
          </button>
        </form>
    </div>
   );
}

export default Login;