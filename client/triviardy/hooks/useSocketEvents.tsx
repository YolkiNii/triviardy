import { useEffect } from "react";
import socket from "@/services/socket";

/*
This code comes from 
https://www.codeconcisely.com/posts/react-socket-io-hooks/
*/

export interface SocketEvent {
  name: string,
  handler(...args: any[]): any;
}

export function useSocketEvents(events: SocketEvent[]) {
  useEffect(() => {
    for (const event of events) {
      socket.on(event.name, event.handler)
    }

    return () => {
      for (const event of events) {
        socket.off(event.name, event.handler);
      }
    }
  }, []);
}