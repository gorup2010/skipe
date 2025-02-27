import { Notication } from "@/types/api";
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ConnectionFail } from "./pages/error/ConnectionFail";
import { Client, IMessage } from "@stomp/stompjs";
import { getAuth } from "@/lib/auth";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { getFriendInvitationsQueryOptions } from "@/features/friend-invitation/api/get-friend-invitation";
import { getFriendsQueryOptions } from "@/features/friend/api/get-friends";
import { getChatroomsQueryOptions } from "@/features/chat/api/get-chatrooms";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  client: Client | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const invalidateQuery = (key: QueryKey) => {
    queryClient.invalidateQueries({
      queryKey: key,
    });
  };

  // TODO: convert to useRef
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [error, setError] = useState(false);

  const disconnect = useCallback(() => {
    client?.deactivate();
  }, [client]);

  const connectWebSocket = () => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/connect-ws",
    });

    client.onConnect = () => {
      const user = getAuth()?.user;

      // client.subscribe("/topic/test", (message: IMessage) => {
      //    console.log("Message received from server:", message.body);
      // });

      client.subscribe(`/queue/${user?.id}`, (message: IMessage) => {
        const notification : Notication = JSON.parse(message.body);
        switch (notification.type) {
          case "NEW_FRIEND":
            invalidateQuery(getFriendInvitationsQueryOptions().queryKey);
            invalidateQuery(getFriendsQueryOptions().queryKey);
            invalidateQuery(getChatroomsQueryOptions().queryKey);
            break;
          case "NEW_FRIEND_INVITATION":
            invalidateQuery(getFriendInvitationsQueryOptions().queryKey);
            break;
        }
      })

      console.log("WebSocket connection established");
      setError(false);
    };

    const errorCallback = () => {
      client.deactivate();
      setError(true);
    };

    client.onDisconnect = errorCallback;
    client.onStompError = errorCallback;
    client.onWebSocketError = errorCallback;
    client.onWebSocketClose = errorCallback;

    client.activate();
    setClient(client);
  };

  const retryConnection = () => {
    setError(false);
    connectWebSocket();
  };

  useEffect(() => {
    if (client == null) {
      connectWebSocket();
    }
    // Cleanup function to close the socket
    return disconnect;
  }, [client, disconnect]);

  const contextValue = useMemo(
    () => ({
      client,
    }),
    [client]
  );

  if (error) {
    // Add disconnect to stop automatically retrying 
    disconnect();
    return <ConnectionFail retryConnection={retryConnection} />;
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
