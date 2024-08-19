import React, {useState, useEffect, useRef} from 'react';
import { generateSpeech } from "../../utils";
import {Box, Typography} from "@mui/material";


const AudioPlayer = ({ text, audioLoading, person }) => {
    const [audioUrl, setAudioUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                // Determine the voice based on gender
                const voice = person.gender === 1 ? "onyx" : "nova";

                const url = await generateSpeech(text, voice);
                if (url !== audioUrl) { // Check if URL has changed before updating state
                    setAudioUrl(url);
                    setIsPlaying(true);
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

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            {audioUrl ? (
                <>
                    <audio
                        ref={audioRef}
                        controls
                        autoPlay
                        src={audioUrl}
                    />
                </>
            ) : (
                <Typography variant="body1">
                    Loading audio...
                </Typography>
            )}
        </Box>
    );
};

export default AudioPlayer;
