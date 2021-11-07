import { Button, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

export default function DarkModeButton() {
  // sun <BsFillSunFill />
  // moon <BsFillMoonFill />
  const { toggleColorMode, colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  return (
    <IconButton
      aria-label="Togge color theme"
      bg="transparent"
      fontSize="xl"
      color={isDarkMode ? "yellow.500" : "inherit"}
      icon={isDarkMode ? <BsSunFill /> : <BsFillMoonFill />}
      onClick={toggleColorMode}
      pos="absolute"
      top="4"
      right="3"
    >
      Toggle theme
    </IconButton>
  );
}
