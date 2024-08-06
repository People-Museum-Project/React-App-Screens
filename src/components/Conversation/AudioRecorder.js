import React, { useState, useEffect, useRef } from 'react';
import { speechRecognition } from "../../utils";
import recordIcon from './voiceInput.png';
import stopIcon from './voiceStop.png';

const AudioRecorder = ({ onSetSelectedQuestion }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null); // State to hold the audio blob
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioBlob(audioBlob); // Update state with the new audio blob
                    audioChunksRef.current = [];
                };
            } catch (err) {
                console.error('Failed to get user media', err);
            }
        };

        getUserMedia();
    }, []);

    useEffect(() => {
        if (audioBlob) {
            // Call speechRecognition whenever audioBlob changes
            const sendAudioToServer = async () => {
                const formData = new FormData();
                formData.append('file', audioBlob, 'audio.wav');

                try {
                    const response = await speechRecognition(formData);
                    console.log(response);
                    if (response.data !== ""){
                        console.log("set selected question based on current audio.")
                        onSetSelectedQuestion(response.data);
                    }
                    else {
                        console.error("Error: failed to generate text from current audio.");
                    }

                } catch (err) {
                    console.error('Error uploading audio', err);
                }
            };

            sendAudioToServer();
        }
    }, [audioBlob]); // Depend on audioBlob


    const toggleRecording = () => {
        if (isRecording){
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
            }
        } else {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
                audioChunksRef.current = []; // Reset audio chunks
                mediaRecorderRef.current.start();
                setIsRecording(true);
            }
        }
    }

    return (
        <button type="button" className="audio-button" onClick={toggleRecording}>
            <img src={isRecording ? stopIcon : recordIcon} alt={isRecording ? "Stop" : "Record"} />
        </button>
    );
};

export default AudioRecorder;
