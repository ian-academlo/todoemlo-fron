import React, { useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: #00cba9;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  const [isOnLogin, setIsOnLogin] = useState(true);

  const { singIn } = useAuth();
  const navigate = useNavigate();

  const changeForm = () => {
    setIsOnLogin(!isOnLogin);
  };

  const onLogin = (user) => {
    singIn(user, () => {});
    navigate("/tasks");
  };

  const onRegister = (data) => {
    console.log(data);
    fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
    setIsOnLogin(true);
  };

  return (
    <Container>
      {isOnLogin ? (
        <LoginForm onLogin={onLogin} changeForm={changeForm} />
      ) : (
        <RegisterForm onRegister={onRegister} changeForm={changeForm} />
      )}
    </Container>
  );
}

export default LoginPage;
