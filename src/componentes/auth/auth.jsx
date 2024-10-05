import styles from "./auth.module.css";
import { FormRegistrar } from "./formRegistrar";

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
