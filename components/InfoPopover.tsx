import {
  chakra,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

export default function InfoPopover(props: any) {
  return (
    <Popover colorScheme="blue">
      <PopoverTrigger>
        <chakra.button
          type="button"
          transition="0.2s"
          _hover={{ transform: "scale(1.1)" }}
          ml="2"
          color="blue.500"
          _dark={{ color: "blue.300" }}
        >
          <Icon as={BsInfoCircle} />
        </chakra.button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{props.children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
