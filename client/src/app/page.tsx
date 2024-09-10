'use client'

import store from "@/stores/store";
import { Provider } from "react-redux";

export default function Home() {
//redirect 
  return (
    <Provider store={store}>
      <></>
    </Provider>
    
  );
}
