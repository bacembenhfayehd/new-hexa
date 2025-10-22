"use client";

import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginSignup = () => {
  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);
  const {syncCartAfterLogin,processPendingOrders} = useAppContext() ;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingOrregister, setLoggingOrRegister] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = `http://localhost:5000/api/auth/${loggingOrregister}`;

      const requestData =
        loggingOrregister === "register"
          ? { name: username, email, password }
          : { email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || `${loggingOrregister} failed`);
      }

      const { user, accessToken } = result.data;
      localStorage.setItem("auth-token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      if (result.data.refreshToken) {
        localStorage.setItem("refresh-token", result.data.refreshToken);
      }

      window.dispatchEvent(new Event("storage"));
      await syncCartAfterLogin();

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
useEffect(() => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    processPendingOrders();
  }
}, [processPendingOrders]);

 if (!isClient || loading) {
  return <Loading />;
}
  return (
    <div className=" h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        {" "}
        {/*onSubmit={register}*/}
        {loggingOrregister === "register" ? (
          <>
            <input
            name="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              type="text"
              className="block w-full rounded-sm p-2 mb-2 border"
              placeholder="nom utilisateur"
            />
            <input
              value={email}
              name="email"
              onChange={(ev) => setEmail(ev.target.value)}
              type="email"
              className="block w-full rounded-sm p-2 mb-2 border"
              placeholder="email@exemple.com"
            />
            <input
              value={password}
              name="password"
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              className="block w-full rounded-sm p-2 mb-2 border"
              placeholder="mot de passe"
            />
          </>
        ) : (
          <>
            <input
            name="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              type="email"
              className="block w-full rounded-sm p-2 mb-2 border"
              placeholder="email@exemple.com"
            />
            <input
              value={password}
              name="password"
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              className="block w-full rounded-sm p-2 mb-2 border"
              placeholder="mot de passe"
            />
          </>
        )}
        <button type="submit"  className="bg-green-700 text-white w-full block rounded-sm p-2">
          {loggingOrregister === "register" ? `S'inscrire` : "Se connecter"}
        </button>
        <div className="mt-2 text-center">
  {loggingOrregister === "register" && (
    <div>
      Déjà un compte ?
      <button
        type="button" 
        data-testid="switch-to-login"
        className="text-green-700 cursor-pointer ml-1"
        onClick={() => setLoggingOrRegister("login")}
      >
        Connectez-vous
      </button>
    </div>
  )}
  {loggingOrregister === "login" && (
    <div>
      Pas de compte ?
      <button
        type="button" 
        data-testid="switch-to-register"
        className="text-green-700 cursor-pointer ml-1"
        onClick={() => setLoggingOrRegister("register")}
      >
        Inscrivez-vous
      </button>
    </div>
  )}
</div>
      </form>
    </div>
  );
};

export default LoginSignup;

