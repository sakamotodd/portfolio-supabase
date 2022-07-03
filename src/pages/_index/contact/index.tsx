import { ExclamationIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ContactFormDTO } from "../../../interface/types";
import { useErrorMessage } from "../../../util/form/useErrorMessage";
import { useMail } from "./useMail";

const Contact: FC = () => {
  const openFlag = false;
  const { name, setName, message, mail, setMail, setMessage, sendAPI } = useMail();
  const { contactValidationSchema } = useErrorMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDTO>({
    resolver: yupResolver(contactValidationSchema),
  });

  const submitBtnOnclick = useCallback(() => {
    toast.promise(sendAPI(), {
      loading: "Loading...",
      success: "送信しました。",
      error: "送信に失敗しました。再度やり直してください。",
    });
  }, []);

  return (
    <div id="Contact" className="flex h-full flex-col items-center justify-center lg:min-h-screen">
      <div className="mt-8">
        <form
          onSubmit={handleSubmit(sendAPI)}
          className="mx-auto w-96 rounded-md border bg-white p-12 md:max-w-md lg:w-[36rem]"
        >
          <div className="mb-8">
            <h1 className="font-hiragino text-center text-xl font-semibold text-black">
              お問い合わせ
            </h1>
            <label className="text-xs text-black">お名前</label>
            <label className="text-xs text-red-700">※</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`${errors.name && "errorInputForm"} inputForm`}
              placeholder="山田太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="mt-1 flex items-center text-red-700">
                <ExclamationIcon className="h-5 w-5" />
                <p className="ml-1 text-xs">{errors.name?.message}</p>
              </div>
            )}
          </div>
          <div className="mb-8">
            <label className="text-xs text-black">Eメール</label>
            <label className="text-xs text-red-700">※</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className={`${errors.email && "errorInputForm"} inputForm`}
              placeholder="メール"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            {errors.email && (
              <div className="mt-1 flex items-center text-red-700">
                <ExclamationIcon className="h-5 w-5" />
                <p className="ml-1 text-xs">{errors.email?.message}</p>
              </div>
            )}
          </div>
          <div className="mb-8">
            <label className="text-xs text-black">問い合わせ内容</label>
            <label className="text-xs text-red-700">※</label>
            <textarea
              className={`${errors.contact && "errorInputForm"} inputForm`}
              rows={5}
              cols={33}
              {...register("contact")}
              placeholder="その他"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
            {errors.contact && (
              <div className="mt-1 flex items-center text-red-700">
                <ExclamationIcon className="h-5 w-5" />
                <p className="mt-2 text-sm text-red-500">{errors.contact?.message}</p>
              </div>
            )}
          </div>
          <button onClick={submitBtnOnclick} className="btnForm w-full">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
