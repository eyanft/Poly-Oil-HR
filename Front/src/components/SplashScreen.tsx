import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import splashVideo from '../assets/posplash.mp4';

const VIDEO_DURATION_MS = 6000;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleExit = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    setIsExiting(true);
    setTimeout(() => {
      navigate('/home', { replace: true });
    }, 600);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    video.volume = 1;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let exitTimer: number;

    const startVideo = async () => {
      try {
        // Toujours démarrer en muted (politique des navigateurs)
        video.muted = true;
        video.volume = 1;
        await video.play();
        console.log('Vidéo démarrée en muted');
        setIsMuted(true);
      } catch (error) {
        console.error('Impossible de lire la vidéo', error);
      }

      // Démarrer le timer de sortie
      exitTimer = window.setTimeout(() => {
        handleExit();
      }, VIDEO_DURATION_MS);
    };

    // Démarrer dès que possible
    if (video.readyState >= 2) {
      void startVideo();
    } else {
      video.addEventListener('canplay', startVideo, { once: true });
    }

    // Sortir quand la vidéo se termine
    const handleEnded = () => {
      clearTimeout(exitTimer);
      handleExit();
    };
    video.addEventListener('ended', handleEnded);

    // Sécurité : sortir après max 7 secondes
    const safeguard = window.setTimeout(() => {
      handleExit();
    }, 7000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(safeguard);
      video.removeEventListener('ended', handleEnded);
    };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Splash screen"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={splashVideo}
        playsInline
        preload="auto"
      />
      
      {/* Bouton pour activer/désactiver le son */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-8 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 z-10"
        aria-label={isMuted ? 'Activer le son' : 'Désactiver le son'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}