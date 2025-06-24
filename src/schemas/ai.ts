import zod from "zod";

const model = zod.enum(
  [
    "distil-whisper-large-v3-en",
    "gemma2-9b-it",
    "llama-3.1-8b-instant",
    "llama-3.3-70b-versatile",
    "meta-llama/llama-guard-4-12b",
    "whisper-large-v3",
    "whisper-large-v3-turbo",
  ],
  {
    message: "Invalid model type",
    required_error: "Model are required",
  }
);
const prompt = zod.string({ message: "Prompt are required." }).min(1).max(100);

const modelSchema = zod.object({
  prompt,
  model,
});

export { modelSchema };
