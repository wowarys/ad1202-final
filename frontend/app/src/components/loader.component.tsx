import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="container max-w-4xl !py-8 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
};

export default Loader;
