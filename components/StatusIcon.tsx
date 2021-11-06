import { Box, HStack, Text } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/system";
const ping = keyframes`
    75%,
    100% {
    transform: scale(2);
    opacity: 0;
    }
`;
export default function StatusIcon(props: { label?: string; isLive: boolean }) {
  const color = props.isLive ? "green.500" : "red.500";
  return (
    <HStack spacing={1}>
      <Box bg={color} h="3" w="3" rounded="full" pos="relative">
        <Box
          animation={
            props.isLive ? `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite` : ""
          }
          pos="absolute"
          top="0"
          h="3"
          w="3"
          bg={color}
          rounded="full"
        ></Box>
      </Box>
      <Text as="small">{props.label}</Text>
    </HStack>
  );
}
