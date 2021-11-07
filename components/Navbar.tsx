import Icon from "@chakra-ui/icon";
import { Box, Heading, HStack, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import {
  BsChatDots,
  BsCompass,
  BsCompassFill,
  BsGlobe,
  BsGlobe2,
  BsPen,
  BsPlusCircle,
  BsSearch,
} from "react-icons/bs";
function NavbarItem(props: { text: string; href: string; icon?: any }) {
  return (
    <NextLink href={props.href}>
      <Link
        d="flex"
        alignItems="center"
        p="4"
        pos="relative"
        _after={{
          content: "''",
          pos: "absolute",
          bottom: "0",
          left: "0",
          w: "100%",
          h: "2px",
          bg: "blue.500",
          opacity: "0",
          transform: "scaleX(0.4) translateY(-2px)",
          transition: "0.2s",
        }}
        _hover={{
          _after: { transform: "scaleX(1) translateY(0)", opacity: "1" },
        }}
        transition="0.2s"
      >
        {props.text}
        {props.icon ? <Icon ml="2" as={props.icon} /> : ""}
      </Link>
    </NextLink>
  );
}
export default function Navbar() {
  return (
    <HStack
      as="nav"
      bg="white"
      p="2"
      zIndex="100"
      border="1px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.700", bg: "gray.800" }}
    >
      <HStack spacing="20" px="20">
        <Box>
          <NextLink href="/">
            <Link _hover={{ textDecoration: "none" }} color="blue.500">
              <HStack align="baseline" role="group">
                <Heading>OnlinePoll</Heading>
                <Icon
                  _groupHover={{
                    transform:
                      "rotate(10deg) scale(1.2) translateX(5px) translateY(-2px)",
                  }}
                  transition="0.2s"
                  fontSize="2xl"
                  ml="3"
                  as={BsChatDots}
                />
              </HStack>
            </Link>
          </NextLink>
        </Box>
        <HStack>
          <NavbarItem href="/poll" text="Create" />
          <NavbarItem href="/polls" text="Discover" />
        </HStack>
      </HStack>
    </HStack>
  );
}
