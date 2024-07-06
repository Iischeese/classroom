import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import SplitView from "@/components/Splitview";
import { Title } from "@/components/Typography";
import FormButton from "@/components/dashboard/FormButton";
import Form, {
  ErrorSpace,
  FormInput,
  FormSpace,
} from "@/components/dashboard/Form";

export default function Login({ searchParams }) {
  const signIn = async (formData) => {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=Could not authenticate user");
    }

    return redirect("/dashboard/classes");
  };

  const signUp = async (formData) => {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=Could not authenticate user");
    }
  };

  return (
    <SplitView>
      <Title>Login</Title>
      <Form>
        <FormInput label={"Email"} id={"email"} />
        <FormInput type="password" label={"Password"} id={"password"} />
        <FormSpace>
          <FormButton primary formAction={signIn} pendingText={"Logging In"}>
            Login
          </FormButton>
          <FormButton formAction={signUp} pendingText="Signing Up">
            Sign Up
          </FormButton>
        </FormSpace>
        {searchParams.error ? (
          <ErrorSpace errorText={searchParams.error} />
        ) : (
          <></>
        )}
      </Form>
    </SplitView>
  );
}
