import spanishMessages from "@/messages/es.json";

export type Messages = typeof spanishMessages;

export function getMessages(): Messages {
  return spanishMessages;
}
