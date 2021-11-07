import { UserValidationMode } from "@/lib/models/poll";
import { createPollAsync } from "@/lib/supabaseStore";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useState } from "react";

let inputId = 1;
const defaultPollOptions: any[] = [
  { id: inputId++, description: "" },
  { id: inputId++, description: "" },
];

export default function useCreatePollForm() {
  //   const maxOptions = 10;
  const router = useRouter();
  const [pollOptions, setPollOptions] = useState<any[]>(defaultPollOptions);
  const [title, setTitle] = useState("");
  const [privateVisibility, setPrivateVisibility] = useState(false);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [userValidationMode, setUserValidationMode] =
    useState<UserValidationMode>("IP");
  function handleDelete(optionId: string) {
    setPollOptions(pollOptions.filter((i) => i.id !== optionId));
  }
  const validPollOptions = pollOptions.filter((option) => option.description);
  const isSubmittable = validPollOptions.length >= 2 && title;
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (!title) return;
    if (pollOptions.length < 2) return;
    const validPollOptions = pollOptions.filter((option) => option.description);
    if (validPollOptions.length < 2) {
      return;
    }
    const res = await createPollAsync(
      {
        is_private: privateVisibility,
        title,
        user_validation_mode: userValidationMode,
      },
      validPollOptions
    );
    const pollId = res.body[0].id;
    try {
      router.push(`/poll/${pollId}`);
    } catch (error) {
      console.error(error);
    }
  }
  function handleNewOption(e: SyntheticEvent) {
    e.preventDefault();
    setPollOptions(() => [...pollOptions, { id: inputId++, description: "" }]);
  }
  function handleOptionChange(optionId: string, text: string) {
    setPollOptions(
      pollOptions.map((option) => {
        if (option.id === optionId) {
          return { ...option, description: text };
        } else {
          return option;
        }
      })
    );
  }

  function handleValidationModeChange(e: ChangeEvent<HTMLSelectElement>) {
    setUserValidationMode(e.target.value as UserValidationMode);
  }

  function toggleMultipleAnswers() {
    setAllowMultipleAnswers(!allowMultipleAnswers);
  }
  function togglePrivateVisibility() {
    setPrivateVisibility(!privateVisibility);
  }
  return {
    pollOptions,
    handleSubmit,
    handleDelete,
    handleNewOption,
    handleOptionChange,
    handleValidationModeChange,
    isSubmittable,
    title,
    setTitle,
    toggleMultipleAnswers,
    togglePrivateVisibility,
  };
}
