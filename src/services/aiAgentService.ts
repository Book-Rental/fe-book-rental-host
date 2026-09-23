const AI_AGENT_URL = import.meta.env.VITE_BACKEND_URL;

export interface AgentResponse {
  success: boolean;
  data?: {
    reply?: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  message?: string;
}

export const sendMessageToAgent = async (
  message: string
): Promise<AgentResponse> => {
  try {
    if (!AI_AGENT_URL) {
      throw new Error("Backend URL is not configured");
    }

    console.log(
      "AI Agent request - using HTTP-only cookie authentication"
    );

    const response = await fetch(
      `${AI_AGENT_URL}/ai`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Browser sends the HTTP-only JWT cookie
        credentials: "include",

        body: JSON.stringify({
          message,
        }),
      }
    );

    const data: AgentResponse =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        "Failed to communicate with AI Agent"
      );
    }

    return data;

  } catch (error) {

    console.error(
      "AI Agent API error:",
      error
    );

    throw error;
  }
};