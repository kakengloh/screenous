import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

interface UseRecorderProps {
  onRecordStop?: (blob: Blob) => void;
}

function useRecorder({ onRecordStop }: UseRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, { toggle: toggleMute }] = useBoolean(true);
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [blob, setBlob] = useState<Blob>();

  const {
    seconds,
    minutes,
    start: startStopwatch,
    reset: resetStopwatch,
  } = useStopwatch({ autoStart: false });

  const startRecord = async () => {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' } as MediaTrackConstraints,
    });

    let stream: MediaStream;

    if (isMuted) {
      stream = videoStream;
    } else {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const videoTrack = videoStream.getTracks()[0];
      const audioTrack = audioStream.getTracks()[0];

      stream = new MediaStream([videoTrack, audioTrack]);
    }

    const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
      ? 'video/webm; codecs=vp9'
      : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType });
    recorder.start();

    startStopwatch();
    setIsRecording(true);
    setRecorder(recorder);
  };

  const stopRecord = () => {
    if (!recorder) return;

    setIsRecording(false);
    resetStopwatch();

    recorder.ondataavailable = (e) => {
      const blob = new Blob([e.data], { type: e.data.type });
      setBlob(blob);
      onRecordStop?.(blob);
    };

    if (recorder.state === 'recording') {
      recorder.stop();
    }

    if (recorder.stream) {
      recorder.stream.getVideoTracks().forEach((track) => track.stop());
      recorder.stream.getAudioTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (minutes >= 5) stopRecord();
  }, [minutes]);

  return {
    isRecording,
    isMuted,
    toggleMute,
    timeElapsed: {
      seconds,
      minutes,
    },
    startRecord,
    stopRecord,
    blob,
  };
}

export default useRecorder;
