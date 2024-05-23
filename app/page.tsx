import Image from "next/image";
import Search from '@/components/Search'; 
import { Container } from "postcss";

export default function Home() {
  return (
    <main  className="flex min-h-screen max-w-screen flex-col items-center justify-between p-24">
      <Search /> 
    </main>
  );
}
