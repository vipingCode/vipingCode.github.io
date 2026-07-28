import React, { useEffect, useRef, useState } from "react";
import { TextDecoder } from "./TextDecoder";
import { RotatingTextDecoder } from "./RotatingTextDecoder";
import { ArrowRight, Cpu, Zap, Activity, Play, Terminal } from "lucide-react";
import heroVideoSrc from "../../assets/heroVideo.mp4";

interface HeroSectionProps {
	onOpenTerminal: () => void;
	onOpenTelemetry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal, onOpenTelemetry }) => {
	const [decoderSeed, setDecoderSeed] = useState(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = true;
		video.defaultMuted = true;
		video.playsInline = true;

		const startPlayback = () => {
			// Some browsers defer muted autoplay until enough media has buffered.
			void video.play().catch(() => {
				// Playback will be retried by the browser when its autoplay policy permits it.
			});
		};

		video.addEventListener("canplay", startPlayback);
		video.load();
		startPlayback();

		return () => video.removeEventListener("canplay", startPlayback);
	}, []);

	return (
		<section className='relative w-full min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 pt-24 md:pt-28 pb-16 overflow-hidden'>
			{/* Background ascii pattern */}
			<div className='ascii-background absolute inset-0 pointer-events-none' />

			{/* Hero content container - 2 Column Grid on Desktop */}
			<div className='relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
				{/* Left Column: Headline & Controls */}
				<div className='lg:col-span-7'>
					{/* Status indicator badge */}
					<div className='font-mono-tech text-xs opacity-75 mb-6 md:mb-8 flex items-center gap-3'>
						<span className='inline-block w-8 sm:w-10 h-[1.5px] bg-[var(--card-border)]' />
						<span className='flex items-center gap-2 bg-[var(--card-bg)] text-[var(--text-primary)] px-3.5 py-1.5 rounded-full border border-[var(--card-border)] text-[11px] sm:text-xs shadow-sm backdrop-blur-md'>
							<span className='w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] motion-safe:animate-pulse' />
							SYS_STATUS: OPTIMIZED
						</span>
					</div>

					{/* Main Title with Reveal & Glow Effect */}
					<h1 className='font-black tracking-tighter mb-6 text-[var(--text-primary)] leading-[1.02] sm:leading-[0.95]'>
						<span className='text-[var(--text-primary)] block font-black tracking-tighter title-reveal-glow whitespace-nowrap text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl'>
							VIPIN GUPTA
						</span>
						<span className='mt-2 block font-black text-[1.55rem] sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap overflow-visible'>
							<RotatingTextDecoder
								roles={["Cloud Engineer", "Cloud Architect", "Cloud Finance", "Cloud Strategy"]}
								scrambleSpeed={40}
								iterationsPerChar={2}
								holdDuration={2200}
								className='opacity-70 font-mono-tech whitespace-nowrap'
							/>
						</span>
					</h1>

					{/* Headline Subtitle */}
					<p className='text-lg sm:text-2xl md:text-3xl max-w-2xl text-[var(--text-secondary)] font-normal leading-snug tracking-tight mb-8 sm:mb-10'>
						<span className='text-[var(--text-secondary)]'>
							Engineering precision at the intersection of finance and cloud infrastructure.
						</span>
					</p>

					{/* Action Buttons (Latency & Decode Reinit hidden on mobile view) */}
					<div className='flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 items-stretch sm:items-center'>
						<button
							onClick={onOpenTerminal}
							className='px-6 sm:px-8 py-3.5 sm:py-4 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] font-mono-tech text-xs font-bold rounded-full hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-3 shadow-xl active:scale-95 min-h-[44px]'>
							<Terminal className='w-4 h-4' />
							<span>INIT_SEQUENCE</span>
							<ArrowRight className='w-4 h-4' />
						</button>

						<button
							onClick={() => setDecoderSeed((prev) => prev + 1)}
							className='hidden sm:flex px-4 py-3.5 sm:py-4 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] font-mono-tech text-xs hover:text-[var(--text-primary)] transition-colors items-center justify-center gap-2 min-h-[44px] backdrop-blur-md'
							title='Re-run text decoder algorithm'>
							<Zap className='w-3.5 h-3.5' />
							<span>DECODE_REINIT</span>
						</button>
					</div>
				</div>

				{/* Right Column: Looping 3D Architecture Video (Desktop view, vertically centered, seamless blended corners, no pointer events) */}
				<div className='lg:col-span-5 hidden lg:flex items-center justify-center relative pointer-events-none select-none'>
					<div className='relative w-full max-w-xl aspect-square flex items-center justify-center pointer-events-none'>
						{/* Ambient background diffusion glow */}
						<div className='absolute inset-4 bg-gradient-to-tr from-zinc-400/15 via-zinc-500/10 to-transparent blur-3xl rounded-full pointer-events-none scale-110' />

						{/* Blended Video Mask Container */}
						<div className='relative w-full h-full video-blended-mask flex items-center justify-center pointer-events-none overflow-hidden'>
							<video
								ref={videoRef}
								className='w-full h-full object-cover scale-110 opacity-95 pointer-events-none hero-video-element'
								src={heroVideoSrc}
								autoPlay
								loop
								muted
								defaultMuted
								playsInline
								preload='auto'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
