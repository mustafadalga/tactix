import { roomService } from "@/services";
import axios from "axios";

interface ErrorResponse {
    response: {
        data: {
            message: string
        }
    }
}

export const fetchRoom = async (roomID: string) => {
    try {
        const response = await roomService.getRoom(roomID);
        return response;

    } catch (error) {
        if (axios.isAxiosError(error) && (error as ErrorResponse).response.data.message) {
            return {
                message: (error as ErrorResponse).response.data.message,
            };
        }

        return {
            message: "An error occurred during fetching room information. Please try again later."
        };
    }
}