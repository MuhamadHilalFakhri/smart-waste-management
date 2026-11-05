import { router } from "expo-router";
import { createContext, useContext, type ReactNode } from "react";
import { useControls } from "./controls";
import { useEditor } from "./use-editor";
import { useFeedback } from "./use-feedback";
import { useReports } from "./use-reports";
import { useSession } from "./use-session";
import { ActionModal } from "./action-modal";
function useWasteState() {
  const session = useSession();
  const feedback = useFeedback();
  const setScreen = (view: string) =>
    router.push(view === "home" ? "/" : (("/" + view) as "/"));
  const reports = useReports(session.token, feedback.setError, setScreen);
  const editor = useEditor(() => reports.load(), setScreen);
  return {
    ...session,
    ...feedback,
    ...reports,
    ...editor,
    ...useControls(feedback.busy),
    setScreen,
  };
}
const Context = createContext<ReturnType<typeof useWasteState> | null>(null);
export function WasteProvider({ children }: { children: ReactNode }) {
  const value = useWasteState();
  return (
    <Context.Provider value={value}>
      {children}
      <ActionModal
        value={value.feedback}
        busy={value.busy}
        onClose={value.dismiss}
        onConfirm={value.proceed}
      />
    </Context.Provider>
  );
}
export function useWaste() {
  const state = useContext(Context);
  if (!state) throw new Error("WasteProvider missing");
  return state;
}
