import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Sidebar, RightPanel } from "./components";
import { LoadingPage } from "./pages";
import { useQuery } from "@tanstack/react-query";

import {
  LoginPage,
  SignupPage,
  HomePage,
  ProfilePage,
  SettingsPage,
  SearchPage,
  NotificationsPage,
  ForgetPage,
} from "./pages";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!res.ok) {
          // throw new Error(data.error || "Failed to fetch user");
          return null;
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
  if (isLoading) return <LoadingPage />;
  return (
    <>
      <section className="flex flex-col-reverse sm:flex-row">
        {authUser && <Sidebar />}
        <div className="flex-1 h-screen overflow-y-scroll">
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/search"
              element={authUser ? <SearchPage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/notifications"
              element={
                authUser ? <NotificationsPage /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/verify"
              element={!authUser ? <ForgetPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/profile/:username"
              element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/profile/:username/settings"
              element={authUser ? <SettingsPage /> : <Navigate to={"/login"} />}
            />
          </Routes>
        </div>
        {authUser && <RightPanel />}
      </section>
    </>
  );
};

export default App;
