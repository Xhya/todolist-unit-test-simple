import S from "s-js";
import { GlobalState } from "./globalState";
import { deepSignal } from "deepsignal/react";

export const globalStateObservable = deepSignal(GlobalState)
