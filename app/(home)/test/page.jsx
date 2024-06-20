'use client'

import { Canvas } from "@react-three/fiber"
import ThreeD from "../3d"
import Button from "@/components/Button"
import { Heading, Text, Title } from "@/components/Typography"
import Image from "next/image"
import Bento from "@/components/dashboard/Bento"

function Test() {

    const gradientHeight = 'h-[45rem]'

    const time = new Date().getHours()

    let timeBased = {}

    if (time > 20 || time == 0) {
        timeBased = { text: 'Tomorrow', image: '/sunrise.svg' }
    }
    else if (time > 17) {
        timeBased = { text: 'this Evening', image: '/sunset.svg' }
    }
    else if (time > 11) {
        timeBased = { text: 'this Afternoon', image: '/daytime.svg' }
    }
    else if (time > 0) {
        timeBased = { text: 'this Morning', image: '/sunrise.svg' }
    }

    return (
        <main className="w-screen h-screen text-white px-40">
            <header className="absolute top-0 left-0 flex w-screen justify-between items-center p-2 px-5">
                Noall
                <div className="flex gap-4">
                    <Button>Pricing</Button>
                    <Button primary link={'/login'}>Login</Button>
                </div>
            </header>
            <section className="h-screen">
                <div className={`px-40 flex flex-col justify-center items-start absolute left-0 -z-10 ${gradientHeight} w-screen bg-gradient-to-tr from-primary to-accent [clip-path:polygon(0_0,100%_0%,100%_80%,0_100%)]`} />
                <div className={`${gradientHeight} w-full flex justify-between items-center gap-8`}>
                    <div>
                        <h1 className="text-9xl opacity-80">NoAll</h1>
                        <Heading>Elevating Education Through Innovation</Heading>
                        <div className="flex gap-4 my-10">
                            <Button>Learn More</Button>
                            <Button link={'/login'} primary>Get Started</Button>
                        </div>
                    </div>
                    <div className="aspect-square w-1/2">
                        <Canvas>
                            <ThreeD />
                        </Canvas>
                    </div>
                </div>
            </section>
            <section className="h-screen flex flex-col items-center p-20 gap-8">
                <Title>Key Features</Title>
                <Bento className="h-full w-full" rows={4} cols={4}>
                    <div className=" col-span-2 row-span-2 bg-red p-3 rounded-md" />
                    <div className=" col-span-2 row-span-1 bg-orange p-3 rounded-md" />
                    <div className=" col-span-1 row-span-2 bg-yellow p-3 rounded-md" />
                    <div className=" col-span-1 row-span-3 bg-primary p-3 rounded-md" />
                    <div className=" col-span-2 row-span-1 bg-secondary p-3 rounded-md" />
                    <div className=" col-span-3 row-span-1 bg-accent p-3 rounded-md" />
                </Bento>
            </section>
            <section className="h-screen p-20 text-center flex flex-col items-center gap-8">
                <div className="aspect-square relative h-40  border-text/40 rounded-xl p-5">
                    <Image className="w-full h-full object-cover" src={"./imgs/time" + timeBased.image} width={100} height={100} />
                </div>
                <Title>Get started {timeBased.text}</Title>
                <Text className="w-1/2">
                    Ready to transform your educational experience? Contact us to learn more about how NoAll can benefit you, or sign up for a free trial and see the difference for yourself.
                </Text>
                <div className="flex flex-col w-1/4 gap-4">
                    <Button style="min-w-fit" primary link={'/login'}>Get Started</Button>
                    <Button style="min-w-fit" >Contact</Button>
                </div>
            </section>
        </main>

    )
}

export default Test