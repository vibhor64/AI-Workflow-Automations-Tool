import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Share2Icon, Webhook, Heart, Database } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "@/components/magicui/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
// import { MarqueeDemoVertical } from "./templates-marquee";
import Image from "next/image";


const files = [
    {
        name: "bitcoin.pdf",
        body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
    },
    {
        name: "finances.xlsx",
        body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
    },
    {
        name: "My Emails",
        body: "Here's a list of my previously written emails. \n Subject: Re: Approval Denied. \n Body: Hey, Nick! \n I hope this finds you well...",
    },
    {
        name: "keys.gpg",
        body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
    },
    {
        name: "seed.txt",
        body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
    },
];

const reviews = [
    {
    img: "/gmail.png",
},
    {
    img: "/discord.png",
},
    {
    img: "/a-b.png",
},
    {
    img: "/sales.png",
},
    {
    img: "/resume.png",
},
    {
    img: "/tech.png",
},
    {
    img: "/csv.png",
},
    {
    img: "/saless.png",
},
]

const features = [
    {
        Icon: Share2Icon,
        name: "Integrations",
        description: "Supports all essential integrations.",
        className: "col-span-3 lg:col-span-1",
        href: "login",
        cta: "Learn more",
        background: (
            <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: Database,
        name: "Built-in Knowledge Base",
        description: "Seamless access to a cloud storage you actually own.",
        href: "login",
        cta: "And it's free",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 w-full overflow-hidden [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 mx-2 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            // "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
                        )}>
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">
                            {f.body}
                        </blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
    }, 
    
    {
        Icon: LightningBoltIcon,
        name: "25+ Ready Made Templates",
        description: "Handcrafted and optimized for the efficiency.",
        href: "login",
        cta: "Explore now",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-10 w-full h-full overflow-hidden [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]">
                <div className="grid grid-cols-4 gap-2 p-2 w-full">
                    {reviews.map((f, idx) => (
                        <figure
                            key={idx}
                            className={cn(
                                "relative h-24 w-24 flex justify-center items-center cursor-pointer overflow-hidden rounded-xl border p-0",
                                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                                // "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
                            )}>
                                <img
                                    className="w-full h-full object-cover"
                                    width="150"
                                    height="150"
                                    alt=""
                                    src={f.img}
                                />
                        </figure>
                    ))}
                </div>
            </div>
            // <Image
            //     src="/templates.png"
            //     alt="a-b"
            //     width="1200"
            //     height={1200}
            //     className="absolute top-[10px] [--duration:20s] [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] " />

        ),
    },
    

    {
        Icon: Heart,
        name: "Stupidly Simple UI",
        description: "Minimal design philosophy emphasizes accomplishments.",
        href: "login",
        cta: "Just click me already",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Image
                src="/screenshot2.png"
                alt="a-b"
                width="1200"
                height={1200}
                className="absolute bottom-[50px] [--duration:20s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] " />
            
        ),
    },

    {
        Icon: Webhook,
        name: "API for Devs",
        description: "Remove hassles of building integrations by a single unified API.",
        href: "login",
        cta: "Exactly what I need",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Image
                src="/api.png"
                alt="a-b"
                width="1200"
                height={1200}
                className="absolute top-[10px] [--duration:20s] [mask-image:linear-gradient(to_top,transparent_60%,#000_100%)] " />

        ),
    },
];

export function BentoDemo() {
    return (
        <BentoGrid className="w-[93vw]">
            {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    );
}
