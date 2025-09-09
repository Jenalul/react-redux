import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Crie e exporte versões tipadas dos hooks. Use-os em toda a sua aplicação
// em vez dos `useDispatch` e `useSelector` padrão.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
