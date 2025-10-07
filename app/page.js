import Herosection from "@/components/herosection";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/navbar/page";

export default function Home() {
  
  return (
    <ProtectedRoute>
    <Navbar/>
    <Herosection />
    </ProtectedRoute>
  );
}
