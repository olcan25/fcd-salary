import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

function Home() {
  useEffect(() => {
    toast.success("Hosgeldiniz...");
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      {/* <Toaster /> */}
    </div>
  );
}

export default Home;
