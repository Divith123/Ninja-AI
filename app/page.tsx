// /home/suzume/NINJA/OpenSource/github/model/nextjs-nvidia-chatbot/pages/index.tsx
import CollapsibleSidebar from "@/components/sidebar";
import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row">
      <CollapsibleSidebar />
      <div className="flex-1 flex items-center justify-center">
        <Chat />
      </div>
    </main>
  );
}