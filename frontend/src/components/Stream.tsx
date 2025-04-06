'use client';

import { useEffect, useRef, useState } from "react";

const Stream = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const websocketRef = useRef<WebSocket | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const frameIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");

    const initializeWebSocket = () => {
        websocketRef.current = new WebSocket(process.env.NEXT_PUBLIC_VISION_API_URL as string);

        websocketRef.current.onopen = () => {
            console.log('WebSocket Connected!');
            setConnectionStatus("Connected");
        };

        websocketRef.current.onerror = (err) => {
            console.error('WebSocket Error:', err);
            setError('WebSocket connection failed.');
            setConnectionStatus("Error");
        };

        websocketRef.current.onclose = (event) => {
            console.log('WebSocket Disconnected!', event.code, event.reason);
            setConnectionStatus(`Disconnected (${event.code})`);
        };

        websocketRef.current.onmessage = (event) => {
            try {
                // Check if the message is binary data (Blob)
                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64 = reader.result as string;
                        setProcessedImage(base64);
                    };
                    reader.readAsDataURL(event.data);
                } else {
                    // Try to parse as JSON if it's not binary
                    const data = JSON.parse(event.data);
                    if (data.image) {
                        setProcessedImage(`data:image/jpeg;base64,${data.image}`);
                    } else if (data.error) {
                        console.error('Error from server:', data.error);
                        setError(`Server error: ${data.error}`);
                    }
                }
            } catch (parseError) {
                console.error('Error processing WebSocket message:', parseError);
            }
        };
    };

    const captureFrame = () => {
        if (!canvasRef.current || !videoRef.current || !websocketRef.current) {
            console.error('Refs not available');
            return;
        }

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const socket = websocketRef.current;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get canvas context');
            return;
        }

        try {
            // Verify video is ready
            if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
                console.warn('Video not ready yet');
                return;
            }

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;

            // Capture frame
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Verify WebSocket connection
            if (socket.readyState !== WebSocket.OPEN) {
                console.warn('WebSocket not open, skipping frame');
                return;
            }

            // Convert canvas to blob and send directly (binary data)
            canvas.toBlob((blob) => {
                if (!blob || !websocketRef.current) return;

                // Send binary data directly
                websocketRef.current.send(blob);

                // Debug log
                console.log(`Sent frame: ${blob.size} bytes`);
            }, 'image/webp', 0.8);

        } catch (error) {
            console.error('Frame capture error:', error);
        }
    };

    const handleStart = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });

            // Set video source
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }

            // Store stream reference
            streamRef.current = stream;

            // Initialize WebSocket
            initializeWebSocket();

            // Wait a moment for everything to initialize
            setTimeout(() => {
                // Start frame capture interval (5 FPS)
                frameIntervalRef.current = setInterval(captureFrame, 200);

                // Update streaming state
                setIsStreaming(true);
                setError(null);
            }, 1000);

        } catch (err) {
            console.error('Error starting stream:', err);
            setError('Could not start video stream. Please check camera permissions.');
        }
    };

    const handleStop = () => {
        // Stop video tracks
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        // Close WebSocket
        if (websocketRef.current) {
            websocketRef.current.close();
            websocketRef.current = null;
        }

        // Clear frame capture interval
        if (frameIntervalRef.current) {
            clearInterval(frameIntervalRef.current);
            frameIntervalRef.current = null;
        }

        // Reset states
        setIsStreaming(false);
        setProcessedImage(null);
        setError(null);
        setConnectionStatus("Disconnected");
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            handleStop();
        };
    }, []);

    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            {error && (
                <div className="text-red-500 p-4 border rounded-lg bg-red-50">
                    {error}
                </div>
            )}

            <div className="text-sm bg-gray-100 p-2 rounded w-full max-w-4xl text-center">
                WebSocket Status: <span className={
                    connectionStatus === "Connected" ? "text-green-600 font-semibold" :
                        connectionStatus === "Error" ? "text-red-600 font-semibold" :
                            "text-gray-600 font-semibold"
                }>{connectionStatus}</span>
            </div>

            <div className="flex space-x-4 w-full max-w-4xl">
                <div className="w-1/2 flex flex-col items-center">
                    <h3 className="mb-2 font-semibold">Original Stream</h3>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="w-full border-2 border-gray-300"
                        muted
                    />
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <h3 className="mb-2 font-semibold">Processed Frame</h3>
                    {processedImage ? (
                        <img
                            src={processedImage}
                            alt="Processed Frame"
                            className="w-full border-2 border-gray-300"
                        />
                    ) : (
                        <div className="w-full h-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 aspect-video">
                            No processed frame
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden canvas for frame capture */}
            <canvas ref={canvasRef} className="hidden" width="640" height="480" />

            <div className="space-x-4 mt-4">
                <button
                    onClick={handleStart}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    disabled={isStreaming}
                >
                    Start Streaming
                </button>
                <button
                    onClick={handleStop}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    disabled={!isStreaming}
                >
                    Stop Streaming
                </button>
            </div>
        </div>
    );
};

export default Stream;