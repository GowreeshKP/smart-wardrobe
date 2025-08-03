import { Header } from "@/components/layout/Header"
import { ChatInterface } from "@/components/chat/ChatInterface"

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <main className="pt-20 h-screen flex flex-col">
        <ChatInterface />
      </main>
    </div>
  )
}

export default Chat