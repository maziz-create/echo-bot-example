import React, { useState } from "react";

import Chat from "@/components/Chat";

function MainPage() {
  const [show, setShow] = useState<boolean>(true);
  return <Chat show={show} setShow={setShow} />;
}

export default MainPage;
