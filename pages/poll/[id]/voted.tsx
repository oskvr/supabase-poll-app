import {
    Box,
    Container,
    Heading,
    Button,
    Icon,
    VStack,
} from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import ConfettiEffect from "@/components/Confetti";

export default function Voted() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <ConfettiEffect />
            <VStack maxW="container.lg" mx="auto" pt="10" spacing={10}>
                <Heading>Thank you for your vote</Heading>
                <Icon
                    as={BsFillCheckCircleFill}
                    fontSize="9xl"
                    color="green.500"
                />

                <Button
                    colorScheme="green"
                    onClick={() => router.push(`/poll/${id}/results`)}
                >
                    View Results
                </Button>
            </VStack>
        </>
    );
}
