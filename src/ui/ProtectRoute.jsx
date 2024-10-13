import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  //1. Load authenticated user
  const { isFetchingUser, isAuthenticated, isFetching } = useUser();

  //2. If there is NO authenticated user, navigate to the login page
  useEffect(() => {
    if (!isAuthenticated && !isFetchingUser && !isFetching) navigate("/login");
  }, [isAuthenticated, isFetchingUser, isFetching, navigate]);

  //3. While fetching user, load spinner
  if (isFetchingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there IS a user, navigate to the app
  if (isAuthenticated) return children;
}

export default ProtectRoute;
