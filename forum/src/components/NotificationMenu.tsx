"use client";

import { useState, useRef, useEffect } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import { Icons } from "./Icons";
const YourAppLayout = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && status === "authenticated" ? (
    <KnockProvider
      apiKey={"pk_test_bQKSL6Du9tZZLVXgZKf2lprqNMnwo7W_iKZ34jCzNFk"}
      //@ts-ignore
      userId={session?.user.id}
    >
      <KnockFeedProvider feedId={"bf74b36d-df23-4d23-90a8-9e015f5fefd3"}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  ) : null;
};

export default YourAppLayout;
