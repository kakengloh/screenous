import { useBoolean } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface UseRecorderProps {
  onRecordStop?: (blob: Blob) => void;
}

const MAX_RECORD_DURATION_IN_MINUTE = 15;

function useRecorder({ onRecordStop }: UseRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, { toggle: toggleMute }] = useBoolean(true);
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [blob, setBlob] = useState<Blob>();
  const [startAt, setStartAt] = useState<Date | null>(null);
  const [secondElapsed, setSecondElapsed] = useState(0);

  const endAt = startAt
    ? dayjs(startAt).add(MAX_RECORD_DURATION_IN_MINUTE, 'minute').toDate()
    : null;

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

    setIsRecording(true);
    setRecorder(recorder);
    setStartAt(new Date());
  };

  const stopRecord = () => {
    if (!recorder) return;

    setIsRecording(false);
    setStartAt(null);

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
    const timeout = setTimeout(() => {
      setSecondElapsed(secondElapsed + 1);
    }, 1000);

    if (!startAt || !endAt) return;

    if (dayjs().isAfter(endAt)) {
      stopRecord();
    }

    return () => clearTimeout(timeout);
  }, [secondElapsed]);

  return {
    isRecording,
    isMuted,
    toggleMute,
    startAt,
    endAt,
    startRecord,
    stopRecord,
    blob,
  };
}

export default useRecorder;
