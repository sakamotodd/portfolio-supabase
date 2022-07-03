import { SignUpFormDTO } from "@/interface/types";
import { useErrorMessage } from "@/util/form/useErrorMessage";
import { supabase } from "@/util/supabase";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import {
  Alert,
  Anchor,
  Avatar,
  Button,
  Group,
  Indicator,
  Loader,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";

export const MailFormSignUp: FC = () => {
  const router = useRouter();
  const { signUpValidationSchema } = useErrorMessage();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const form = useForm<SignUpFormDTO>({
    schema: yupResolver(signUpValidationSchema),
    initialValues: {
      name: "",
      email: "",
      password: "",
      pass: "",
    },
  });
  const handleSubmit = async () => {
    const { error } = await supabase.auth.signUp(
      {
        email: form.values.email,
        password: form.values.password,
      },
      {
        data: {
          full_name: form.values.name,
          avatar_url: avatarUrl,
        },
      },
    );
    if (error) {
      setError(error.message);
    }
    form.reset();
  };

  const uploadAvatarImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error("Please select the image file");
    }
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    setIsLoading(true);
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);
    if (error) {
      console.log(error);
    }
    setAvatarUrl(
      `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${fileName}`,
    );
    setIsLoading(false);
  };

  return (
    <Group direction="column" position="center" mt="md">
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
      {isLoading && <Loader />}
      {avatarUrl && (
        <Indicator
          label=""
          size={16}
          offset={7}
          position="bottom-end"
          color="green"
          withBorder
        >
          <Avatar size="lg" src={avatarUrl} />
        </Indicator>
      )}
      <label htmlFor="avatar">
        <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
      </label>
      <input
        className="hidden"
        type="file"
        id="avatar"
        accept="image/*"
        onChange={(e) => uploadAvatarImg(e)}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          id="name"
          label="Name*"
          placeholder="山田太郎"
          {...form.getInputProps("name")}
        />
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
        <PasswordInput
          mt="md"
          id="pass"
          placeholder="password"
          label="Password*"
          description="Must include one upper + lower char & special char"
          {...form.getInputProps("pass")}
        />
        <Group mt="lg" position="apart">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => {
              router.push("/login/signIn");
              setError("");
            }}
            size="xs"
          >
            ログインはこちら
          </Anchor>
          <Button type="submit" color="blue" variant="filled">
            Login
          </Button>
        </Group>
      </form>
    </Group>
  );
};
