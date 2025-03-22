import { GridPattern } from "@/components/magicui/grid-pattern";
import { WordRotate } from "@/components/magicui/word-rotate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DockDemo } from "@/components/custom/dock-menu";
import { AnimatedGradientTextButton } from "@/components/custom/gradient-text-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedBeamExample2 } from "@/components/custom/beam2";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { BentoDemo } from "@/components/custom/bento";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { MarqueeTweet } from "@/components/custom/tweet-marquee";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { PointerDemo1 } from "@/components/custom/card-frame";

const texts = [
    "AI-Native",
    "Free & Open Source",
    "User-Centric",
    "Comically Easy",
    "Privacy Focused",
];

export default function Home() {
    return (
        <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
            {/* Background */}
            <GridPattern
                width={50}
                height={50}
                x={-1}
                y={-1}
                strokeDasharray="4 4"
                // className={cn(
                //   "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                // )}
            />

            {/* Scroll Progress */}
            <ScrollProgress className="top-[0px] h-1" />

            {/* Github */}
            <div className="absolute top-6 right-10 z-500">
                <InteractiveHoverButton>
                    Star on GitHub 🌟
                </InteractiveHoverButton>
            </div>
            {/* <div className="absolute top-6 left-8 z-500 flex flex-row">
                <Image
                    src="/weavebot-alpha.png"
                    alt="logo"
                    width="40"
                    height="40"
                />
            </div> */}

            {/* Main Body */}
            <div className="flex flex-col mt-26 items-center h-full w-full">
                {/* Rotating Title */}
                <WordRotate
                    className="lg:text-[4rem] text-[2rem] md:text-[3rem] font-bold text-[#e9ed07] z-10"
                    words={texts}
                />

                {/* Main Title */}
                <div className="z-10 font-bold lg:text-[4rem] md:text-[3rem] text-[1.7rem]">
                    Workflow{" "}
                    <AuroraText className="italic">Automation</AuroraText> Tool
                    {/* Go To Login Page*/}
                    <div
                        style={{
                            position: "absolute",
                            top: "50.2%",
                            left: "50%",
                            transform: "translate(-50%, 50%)",
                            zIndex: 50,
                        }}>
                        <div className="text-[0.6rem] font-[500] text-[#aaa] text-center mb-1">
                            No Sign Up Required
                        </div>
                        <AnimatedGradientTextButton />
                    </div>
                    {/* Animated Beam */}
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -30%)",
                            zIndex: 49,
                            width: "100vw",
                        }}>
                        <AnimatedBeamExample2 />
                    </div>
                </div>

                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "58vh",
                        maxHeight: "58vh",
                    }}></div>

                {/* Video Dialog */}
                <div className="relative">
                    <HeroVideoDialog
                        animationStyle="from-center"
                        // videoSrc="/hero-video.mp4"
                        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                        thumbnailSrc="/weavebot-showcase.png"
                        thumbnailAlt="Showcase Video"
                        className="w-[80vw]"
                    />
                </div>

                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "10vh",
                        maxHeight: "10vh",
                    }}></div>

                <div
                    style={{ lineHeight: "1" }}
                    className="font-bold lg:text-[4rem] md:text-[3rem] text-[1.7rem] text-center mb-12 mx-18">
                    A Platform to Create, Deploy and Automate your APIs and
                    Workflows.
                </div>

                {/* Bento */}
                <BentoDemo />

                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "10vh",
                        maxHeight: "10vh",
                    }}></div>
                
                {/* Use cases */}
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <VelocityScroll>USE CASES</VelocityScroll>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>

                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "10vh",
                        maxHeight: "10vh",
                    }}></div>

                <PointerDemo1 />

                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "10vh",
                        maxHeight: "10vh",
                    }}></div>

                <SparklesText
                    text="Wall of Love"
                    className="font-bold lg:text-[4rem] md:text-[3rem] text-[1.7rem] mb-6"
                />
                <MarqueeTweet />
                {/* White space */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        minHeight: "5vh",
                        maxHeight: "5vh",
                    }}></div>

                <div className="width-full h-10 text-[#aaa] z-10">
                    Contact me ..-. .-. . . / .... ..- --. -.-.-- 👇
                </div>
            </div>

            {/* Navigation Dock */}
            <DockDemo />
        </div>
    );
}
