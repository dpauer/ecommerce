import { toast } from "react-toastify";

export function onSuccessHandler(text: string): () => void {
    return () => {
        toast(text, { type: "success" });
    };
}
