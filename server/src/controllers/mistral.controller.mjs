import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../utils/response.util.mjs";
import { sendMessage } from "../services/mistral.service.mjs";

export const sendMistralMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return sendErrorResponse(res, 400, "Message is required");
    }

    const response = await sendMessage(message);

    return sendSuccessResponse(res, 200, "Message sent successfully", response);
  } catch (err) {
    console.error("Error sending Mistral message:", err);

    return sendErrorResponse(
      res,
      500,
      "Failed to send Mistral message",
      err.message,
    );
  }
};
