export interface UserSubmissionFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    usernameRef: React.RefObject<HTMLInputElement>;
    passwordRef: React.RefObject<HTMLInputElement>;
  }
  
  export interface LoginPageProps {
    onLogin: () => void;
    isLoggedIn: boolean;
  }
  
  export interface SignupPageProps {
    onSignup: () => void;
    isSignedUp: boolean;
  }
  
  export interface Post {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    likes: number;
  }