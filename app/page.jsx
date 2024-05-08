import Button from "@/components/Button"

function Home() {
  return (
    <>
      <section className="h-screen w-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-9xl">Noall</h1>
        <h2 className="text-3xl">The all in one teaching solution.</h2>
        <div className="flex flex-col gap-2">
          <Button link={'/login'} primary>Sign Up</Button>
          <Button>Learn More</Button>
        </div>
      </section>
    </>
  )
}

export default Home