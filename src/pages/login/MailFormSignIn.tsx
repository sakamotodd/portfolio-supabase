import { SignInFormDTO } from "@/interface/types";
import { useErrorMessage } from "@/util/form/useErrorMessage";
import { supabase } from "@/util/supabase";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { FC, useState } from "react";

export const MailFormSignIn: FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { signInValidationSchema } = useErrorMessage();
  const [error, setError] = useState("");
  const form = useForm<SignInFormDTO>({
    schema: yupResolver(signInValidationSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async () => {
    const { error } = await supabase.auth.signIn({
      email: form.values.email,
      password: form.values.password,
    });
    if (error) {
      setError(error.message);
    }
    form.reset();
  };
  return (
    <Group
      direction="column"
      position="center"
    >
      {error && (
        <Alert
          mt="md"
          icon={<ExclamationCircleIcon className="text-pink-500" />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt="md"
          id="email"
          label="Email*"
          placeholder="example@gmail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          mt="md"
          id="password"
          placeholder="password"
          label="Password*"
          description="Must include one upper + lower char & special char"
          {...form.getInputProps("password")}
        />
        <Group mt="lg" position="apart">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => {
              router.push("/login/signUp");
              setError("");
            }}
            size="xs"
          >
            アカウント登録はこちら
          </Anchor>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-400">
            Login
          </Button>
        </Group>
      </form>
    </Group>
  );
};
