import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsClipboard } from "react-icons/bs";

interface ShareButtonProps {
  text: string;
  textAfterCopy: string;
}
export default function ShareButton(props: ShareButtonProps) {
  const [url, setUrl] = useState("");
  const { hasCopied, onCopy } = useClipboard(url, 3500);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Button
      colorScheme={hasCopied ? "green" : "blue"}
      onClick={onCopy}
      rightIcon={<BsClipboard />}
      w="150px"
    >
      {hasCopied ? props.textAfterCopy : props.text}
    </Button>
  );
}
