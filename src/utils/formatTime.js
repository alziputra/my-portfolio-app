import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const formatRelativeTime = (isoString) => {
  try {
    const date = new Date(isoString);
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Waktu tidak valid";
  }
};
