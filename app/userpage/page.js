import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

const AccountPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleGitHubSignIn = async () => {
    await gitHubSignIn();
  };

  const handleFirebaseSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div>
      <h1>User Account Page</h1>

      {user ? (
        <div>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <button onClick={handleFirebaseSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <button onClick={handleGitHubSignIn}>Sign In with GitHub</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage();