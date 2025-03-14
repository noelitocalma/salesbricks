import { Montserrat } from "next/font/google";
import OrderModule from "@/modules/order";

const Montserrat_Sans = Montserrat({
  variable: '--font-montserrat',
})

export default function Home() {
  return (
    <div className={`${Montserrat_Sans.variable} min-h-screen flex items-center justify-center`}>
      <OrderModule />
    </div>
  );
}
