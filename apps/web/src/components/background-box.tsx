interface BackgroundBoxProps {
  content: JSX.Element,
  banner: JSX.Element,
}

export function BackgroundBox({ banner, content }: BackgroundBoxProps) {
  return (
    <div className="my-8 mx-6 md:my-12 md:mx-10 rounded-md w-full bg-white flex">
      <main className="w-full p-12">
        {content}
      </main>
      <div className={`
        md:w-full 
        md:bg-gradient-to-bl from-yellow-200 via-orange-300 to-yellow-300 
        md:rounded-md p-12
        hidden
        md:block
      `}>
        {banner}
      </div>
    </div>
  )
}