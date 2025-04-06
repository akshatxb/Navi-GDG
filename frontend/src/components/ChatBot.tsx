"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { ArrowUpIcon, BotIcon, MessageSquareTextIcon, XIcon } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import clsx from "clsx"


const ChatBot = () => {
    const chatRef = useRef<HTMLDivElement | null>(null)
    const [isChat, setChat] = useState<boolean>(false);
    const socketRef = useRef<WebSocket | null>(null)
    const [messages, setMessages] = useState<Array<{ sender: string; message: string, steps: Array<string> | null }>>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const initializeSocket = () => {
        const socket = new WebSocket(process.env.NEXT_PUBLIC_CHAT_API_URL as string)
        socketRef.current = socket

        socket.onopen = () => {
            console.log("WebSocket connection established")
        }

        socket.onclose = () => {
            console.log("WebSocket connection closed")
            socketRef.current = null
        }

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                if (data) {
                    setMessages((prevMessages) => [...prevMessages, { sender: "bot", message: data.message, steps: data.steps }])
                }
                setIsLoading(false)
            } catch (error) {
                console.error("Error parsing message data:", error)
            }
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error)
            socketRef.current = null
        }
    }

    const sendMessage = () => {
        const messageText = inputRef.current?.value.trim()
        if (messageText && socketRef.current && inputRef.current) {
            socketRef.current.send(messageText)
            setIsLoading(true)
            setMessages((prevMessages) => [...prevMessages, { sender: "user", message: messageText, steps: null }])
            inputRef.current.value = ""
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const handleChat = () => {
        if (!socketRef.current) {
            initializeSocket()
        }
        setChat(isChat => !isChat)
    }

    const handleOutClick = useCallback((event: globalThis.MouseEvent) => {
        if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
            setChat(false)
            if (socketRef.current) {
                socketRef.current.close()
                socketRef.current = null
            }

        }
    }, [])

    const handleClearChat = () => {
        setMessages([])
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutClick)

        return () => {
            document.removeEventListener("mousedown", handleOutClick)
        }
    }, [handleOutClick])

    useEffect(() => {
        return () => {
            socketRef.current?.close()
        }
    }, [])

    return (
        <>
            <div onClick={handleChat} className={clsx("hover:scale-90 transition-transform duration-200 delay-100 bg-foreground rounded-4xl text-white fixed bottom-10 right-10 z-40", { "scale-100": !isChat, "scale-0": isChat })}>
                <BotIcon className="m-4 h-8 w-8" />
            </div>
            <Card ref={chatRef} className={clsx("fixed bottom-10 right-10 z-40 gap-3 items-center py-4 min-h-[30rem] h-[35rem] w-96 max-w-[25rem] shadow-lg transition-transform duration-300 ease-in-out origin-bottom-right", { "scale-100": isChat, "scale-0": !isChat })}>
                <div className="flex flex-col justify-between items-center w-full px-6 py-1 after:bg-muted-foreground/30 after:w-full after:h-[0.05rem] after:content-[''] after:block">
                    <div className="flex justify-between items-center w-full mb-3">
                        <MessageSquareTextIcon onClick={handleClearChat} />
                        <XIcon onClick={handleChat} className="self-end" />
                    </div>
                </div>
                <CardContent data-lenis-prevent className="flex-1 w-full overflow-auto ">
                    <div className="flex flex-col space-y-3">
                        {messages.map((message, index) => (
                            <div key={index} className="flex flex-col text-sm">
                                <div className={`max-w-xs px-1 ${message.sender === "user" ? "self-end" : "self-start"}`}>{message.sender === "user" ? "You" : "Bot"}</div>
                                <div

                                    className={`max-w-xs p-3 rounded-lg ${message.sender === "user" ? "self-end bg-foreground/90 text-white" : "self-start bg-gray-200 text-black"
                                        }`}
                                >
                                    <div>
                                        {message.message}
                                        {message.steps && message.steps.length > 0 && (
                                            message.steps.map((step, stepIndex) => (
                                                <li key={stepIndex} className="list-none ">
                                                    {stepIndex + 1}. {step}
                                                </li>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            {isLoading ?
                                <div className="flex flex-col text-sm">
                                    <div className="max-w-xs px-1 self-start">Bot</div>
                                    <div className="w-24 h-10 rounded-lg bg-gray-200 text-black self-start overflow-hidden flex justify-center items-center">
                                        <DotLottieReact
                                            src="https://lottie.host/169b84aa-1474-4216-bc82-02b9cb4d66ed/Yd5qjqyyXo.lottie"
                                            loop
                                            autoplay
                                            className="scale-125"
                                        />
                                    </div>
                                </div>
                                :
                                null}
                        </div>
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="h-32"></div>
                </CardContent>
                <CardFooter className="absolute bottom-10 w-11/12 flex items-center bg-gray-300/50 rounded-lg p-3 backdrop-blur-lg">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask Anything"
                        autoComplete="off"
                        className="flex-1 px-3 py-2 outline-none rounded-md text-black"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="ml-3 p-2 bg-foreground/90 rounded-full hover:bg-foreground/70 transition"
                        onClick={sendMessage}
                    >
                        <ArrowUpIcon className="h-5 w-5 text-white" />
                    </button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ChatBot
