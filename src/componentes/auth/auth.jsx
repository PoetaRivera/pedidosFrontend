import styles from "./auth.module.css";
import { FormRegistrar } from "./formRegistrar";
import { Logout } from "./logout.jsx";

// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------

export function Auth() {

  const { auth } = styles;
  return (
    <div className={auth}>
      <FormRegistrar />
      
    </div>
  );
}
