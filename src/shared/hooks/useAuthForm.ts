import { useState } from "react";

type AuthFormValues = {
  email: string;
  password: string;
};

type UseAuthFormProps = {
  onSubmit: (values: AuthFormValues) => void;
};

export const useAuthForm = ({ onSubmit }: UseAuthFormProps) => {
  const [form, setForm] = useState<AuthFormValues>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  return { form, onChange, handleSubmit };
};

// const onRegister = useRegister();

// const { form, onChange, handleSubmit } = useAuthForm((data) => {
//   onRegister.mutate(data);
// });
