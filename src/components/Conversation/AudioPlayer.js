import React, { useState, useEffect } from 'react';
import { generateSpeech } from "../../utils";

const AudioPlayer = ({ text }) => {
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const url = await generateSpeech(text);
                if (url !== audioUrl) { // Check if URL has changed before updating state
                    setAudioUrl(url);
                }
            } catch (error) {
                console.error('Failed to generate speech:', error);
            }
        };

        if (text) {
            fetchAudio();
        }

        // Cleanup the URL when the component unmounts or `text` changes
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [text]);

    return (
        <div>
            {audioUrl && <audio controls autoPlay src={audioUrl} />}
        </div>
    );
};

export default AudioPlayer;
